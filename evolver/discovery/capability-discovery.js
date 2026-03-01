const fs = require('fs');
const path = require('path');

const DISCOVERY_LOG_FILE = path.join(__dirname, '../discovery-logs.json');

class CapabilityDiscovery {
  constructor(unifiedInterface) {
    this.unifiedInterface = unifiedInterface;
    this.capabilityIndex = new Map();
    this.tagIndex = new Map();
    this.categoryIndex = new Map();
    this.discoveryLogs = this.loadDiscoveryLogs();
    this.searchHistory = [];
  }

  loadDiscoveryLogs() {
    if (fs.existsSync(DISCOVERY_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(DISCOVERY_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading discovery logs:', error.message);
        return [];
      }
    }
    return [];
  }

  saveDiscoveryLogs() {
    fs.writeFileSync(DISCOVERY_LOG_FILE, JSON.stringify(this.discoveryLogs, null, 2));
  }

  buildIndex() {
    console.log('Building capability discovery index');

    this.capabilityIndex.clear();
    this.tagIndex.clear();
    this.categoryIndex.clear();

    const capabilities = this.unifiedInterface.listCapabilities();

    for (const capability of capabilities) {
      const info = this.unifiedInterface.getCapabilityInfo(capability.id);
      if (!info) continue;

      this.capabilityIndex.set(capability.id, {
        id: capability.id,
        category: capability.category,
        description: capability.description,
        metadata: info.metadata
      });

      const category = capability.category || 'general';
      if (!this.categoryIndex.has(category)) {
        this.categoryIndex.set(category, []);
      }
      this.categoryIndex.get(category).push(capability.id);

      const tags = this.extractTags(capability);
      for (const tag of tags) {
        if (!this.tagIndex.has(tag)) {
          this.tagIndex.set(tag, []);
        }
        this.tagIndex.get(tag).push(capability.id);
      }
    }

    console.log(`✅ Index built: ${this.capabilityIndex.size} capabilities, ${this.tagIndex.size} tags, ${this.categoryIndex.size} categories`);
  }

  extractTags(capability) {
    const tags = new Set();

    if (capability.category) {
      tags.add(capability.category.toLowerCase());
    }

    if (capability.description) {
      const words = capability.description.toLowerCase().split(/\s+/);
      for (const word of words) {
        if (word.length > 3) {
          tags.add(word);
        }
      }
    }

    if (capability.id) {
      const parts = capability.id.split(/[-_]/);
      for (const part of parts) {
        if (part.length > 2) {
          tags.add(part.toLowerCase());
        }
      }
    }

    return Array.from(tags);
  }

  search(query, options = {}) {
    console.log(`Searching capabilities: "${query}"`);

    const startTime = Date.now();
    const results = [];

    const searchTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);

    for (const [id, capability] of this.capabilityIndex) {
      let score = 0;
      const matchReasons = [];

      if (id.toLowerCase().includes(query.toLowerCase())) {
        score += 10;
        matchReasons.push('id_match');
      }

      if (capability.description?.toLowerCase().includes(query.toLowerCase())) {
        score += 5;
        matchReasons.push('description_match');
      }

      for (const term of searchTerms) {
        if (this.tagIndex.has(term) && this.tagIndex.get(term).includes(id)) {
          score += 3;
          matchReasons.push(`tag_match:${term}`);
        }
      }

      if (capability.category?.toLowerCase().includes(query.toLowerCase())) {
        score += 2;
        matchReasons.push('category_match');
      }

      if (score > 0) {
        results.push({
          capability,
          score,
          matchReasons
        });
      }
    }

    results.sort((a, b) => b.score - a.score);

    const limitedResults = results.slice(0, options.limit || 10);

    const searchLog = {
      timestamp: new Date().toISOString(),
      query,
      resultCount: limitedResults.length,
      duration: Date.now() - startTime
    };

    this.searchHistory.push(searchLog);
    this.discoveryLogs.push(searchLog);
    this.saveDiscoveryLogs();

    console.log(`✅ Search complete: ${limitedResults.length} results`);
    return limitedResults;
  }

  browseByCategory(category) {
    console.log(`Browsing capabilities by category: ${category}`);

    const capabilities = this.categoryIndex.get(category) || [];
    const results = capabilities.map(id => this.capabilityIndex.get(id)).filter(Boolean);

    this.discoveryLogs.push({
      timestamp: new Date().toISOString(),
      action: 'browse_category',
      category,
      resultCount: results.length
    });
    this.saveDiscoveryLogs();

    return results;
  }

  browseByTag(tag) {
    console.log(`Browsing capabilities by tag: ${tag}`);

    const capabilities = this.tagIndex.get(tag.toLowerCase()) || [];
    const results = capabilities.map(id => this.capabilityIndex.get(id)).filter(Boolean);

    this.discoveryLogs.push({
      timestamp: new Date().toISOString(),
      action: 'browse_tag',
      tag,
      resultCount: results.length
    });
    this.saveDiscoveryLogs();

    return results;
  }

  getCategories() {
    return Array.from(this.categoryIndex.keys());
  }

  getTags() {
    return Array.from(this.tagIndex.keys());
  }

  getCapabilityDetails(capabilityId) {
    return this.capabilityIndex.get(capabilityId);
  }

  getPopularCapabilities(limit = 10) {
    const stats = this.unifiedInterface.getStatistics();
    const byCapability = stats.byCapability || {};

    const sorted = Object.entries(byCapability)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);

    return sorted.map(([id, count]) => ({
      capability: this.capabilityIndex.get(id),
      usageCount: count
    }));
  }

  getRecentCapabilities(limit = 10) {
    const capabilities = Array.from(this.capabilityIndex.values());
    return capabilities
      .sort((a, b) => new Date(b.metadata?.registeredAt) - new Date(a.metadata?.registeredAt))
      .slice(0, limit);
  }

  getDiscoveryStatistics() {
    return {
      totalCapabilities: this.capabilityIndex.size,
      totalTags: this.tagIndex.size,
      totalCategories: this.categoryIndex.size,
      totalSearches: this.searchHistory.length,
      recentSearches: this.searchHistory.slice(-10)
    };
  }

  clearHistory() {
    this.searchHistory = [];
    this.discoveryLogs = [];
    this.saveDiscoveryLogs();
    console.log('Discovery history cleared');
  }
}

module.exports = CapabilityDiscovery;
