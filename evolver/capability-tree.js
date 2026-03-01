const fs = require('fs');
const path = require('path');

const CAPABILITY_TREE_FILE = path.join(__dirname, 'capability-tree.json');

class CapabilityTree {
  constructor() {
    this.tree = this.loadTree();
  }

  loadTree() {
    if (fs.existsSync(CAPABILITY_TREE_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(CAPABILITY_TREE_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading capability tree:', error.message);
        return this.createEmptyTree();
      }
    }
    return this.createEmptyTree();
  }

  createEmptyTree() {
    const rootNode = this.createNode({
      name: 'Root',
      level: 'high',
      inputs: [],
      outputs: [],
      successPrerequisites: [],
      failureBoundaries: []
    }, 'root');

    return {
      rootId: rootNode.id,
      nodes: {
        [rootNode.id]: rootNode
      },
      metadata: {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        nodeCount: 1
      }
    };
  }

  saveTree() {
    this.tree.metadata.lastUpdated = new Date().toISOString();
    this.tree.metadata.nodeCount = Object.keys(this.tree.nodes).length;
    fs.writeFileSync(CAPABILITY_TREE_FILE, JSON.stringify(this.tree, null, 2));
    console.log('Capability tree saved to', CAPABILITY_TREE_FILE);
  }

  createNode(nodeData, rootId) {
    const node = {
      id: `node_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: nodeData.name,
      level: nodeData.level || 'low',
      inputs: nodeData.inputs || [],
      outputs: nodeData.outputs || [],
      successPrerequisites: nodeData.successPrerequisites || [],
      failureBoundaries: nodeData.failureBoundaries || [],
      parentId: nodeData.parentId || rootId || 'root',
      children: [],
      lastTriggered: new Date().toISOString(),
      usageCount: 0,
      effectiveness: 0.8,
      status: 'active'
    };

    return node;
  }

  addNode(nodeData) {
    console.log('=== Adding node to capability tree ===');

    // Validate node data
    if (!this.validateNodeData(nodeData)) {
      console.error('Invalid node data');
      return null;
    }

    // Create node
    const node = this.createNode(nodeData, this.tree.rootId);

    // Add to nodes map
    this.tree.nodes[node.id] = node;

    // Add to parent's children
    if (node.parentId && this.tree.nodes[node.parentId]) {
      this.tree.nodes[node.parentId].children.push(node.id);
    }

    this.saveTree();
    console.log(`✅ Node added: ${node.name} (${node.id})`);
    return node;
  }

  validateNodeData(nodeData) {
    // Check required fields
    if (!nodeData.name) {
      console.error('Node must have a name');
      return false;
    }

    if (!nodeData.inputs || !Array.isArray(nodeData.inputs)) {
      console.error('Node must have inputs array');
      return false;
    }

    if (!nodeData.outputs || !Array.isArray(nodeData.outputs)) {
      console.error('Node must have outputs array');
      return false;
    }

    if (!nodeData.successPrerequisites || !Array.isArray(nodeData.successPrerequisites)) {
      console.error('Node must have successPrerequisites array');
      return false;
    }

    if (!nodeData.failureBoundaries || !Array.isArray(nodeData.failureBoundaries)) {
      console.error('Node must have failureBoundaries array');
      return false;
    }

    return true;
  }

  removeNode(nodeId) {
    console.log(`=== Removing node: ${nodeId} ===`);

    if (!this.tree.nodes[nodeId]) {
      console.error('Node not found');
      return false;
    }

    const node = this.tree.nodes[nodeId];

    // Remove from parent's children
    if (node.parentId && this.tree.nodes[node.parentId]) {
      const parent = this.tree.nodes[node.parentId];
      parent.children = parent.children.filter(id => id !== nodeId);
    }

    // Remove children recursively
    node.children.forEach(childId => {
      this.removeNode(childId);
    });

    // Remove from nodes map
    delete this.tree.nodes[nodeId];

    this.saveTree();
    console.log(`✅ Node removed: ${node.name}`);
    return true;
  }

  updateNode(nodeId, updates) {
    console.log(`=== Updating node: ${nodeId} ===`);

    if (!this.tree.nodes[nodeId]) {
      console.error('Node not found');
      return false;
    }

    const node = this.tree.nodes[nodeId];
    Object.assign(node, updates);
    node.lastUpdated = new Date().toISOString();

    this.saveTree();
    console.log(`✅ Node updated: ${node.name}`);
    return true;
  }

  getNode(nodeId) {
    return this.tree.nodes[nodeId] || null;
  }

  getAllNodes() {
    return Object.values(this.tree.nodes);
  }

  getNodesByLevel(level) {
    return Object.values(this.tree.nodes).filter(node => node.level === level);
  }

  getChildren(nodeId) {
    const node = this.getNode(nodeId);
    if (!node) return [];
    return node.children.map(childId => this.getNode(childId)).filter(Boolean);
  }

  getParent(nodeId) {
    const node = this.getNode(nodeId);
    if (!node || !node.parentId) return null;
    return this.getNode(node.parentId);
  }

  // Task 2: Hierarchical structure
  determineNodeLevel(nodeData) {
    // Determine level based on node characteristics
    if (nodeData.inputs.length <= 2 && nodeData.outputs.length <= 2) {
      return 'low'; // Basic operations
    } else if (nodeData.inputs.length <= 5 && nodeData.outputs.length <= 5) {
      return 'medium'; // Reusable processes
    } else {
      return 'high'; // Problem decomposition
    }
  }

  findOptimalParent(nodeData) {
    // Find the most suitable parent for a new node
    const level = this.determineNodeLevel(nodeData);
    
    // For low-level nodes, find medium-level parents
    if (level === 'low') {
      const mediumNodes = this.getNodesByLevel('medium');
      if (mediumNodes.length > 0) {
        // Find the medium node with most similar inputs/outputs
        return this.findMostSimilarNode(mediumNodes, nodeData);
      }
      return this.tree.rootId;
    }
    
    // For medium-level nodes, find high-level parents
    if (level === 'medium') {
      const highNodes = this.getNodesByLevel('high');
      if (highNodes.length > 1) { // Exclude root if there are other high-level nodes
        const nonRootHighNodes = highNodes.filter(node => node.id !== this.tree.rootId);
        if (nonRootHighNodes.length > 0) {
          return this.findMostSimilarNode(nonRootHighNodes, nodeData);
        }
      }
      return this.tree.rootId;
    }
    
    // For high-level nodes, use root as parent
    return this.tree.rootId;
  }

  findMostSimilarNode(nodes, nodeData) {
    let mostSimilarNode = nodes[0];
    let highestSimilarity = 0;

    nodes.forEach(node => {
      const similarity = this.calculateSimilarity(node, nodeData);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        mostSimilarNode = node;
      }
    });

    return mostSimilarNode.id;
  }

  calculateSimilarity(node1, node2) {
    // Calculate similarity between two nodes
    let similarity = 0;

    // Input similarity
    const inputSimilarity = this.calculateArraySimilarity(node1.inputs, node2.inputs);
    similarity += inputSimilarity * 0.3;

    // Output similarity
    const outputSimilarity = this.calculateArraySimilarity(node1.outputs, node2.outputs);
    similarity += outputSimilarity * 0.3;

    // Level similarity
    if (node1.level === node2.level) {
      similarity += 0.4;
    }

    return similarity;
  }

  calculateArraySimilarity(array1, array2) {
    if (!array1 || !array2) return 0;
    if (array1.length === 0 || array2.length === 0) return 0;

    const intersection = array1.filter(item => array2.includes(item));
    return intersection.length / Math.max(array1.length, array2.length);
  }

  // Task 3: Capability merging and pruning
  findSimilarNodes(nodeData) {
    const allNodes = this.getAllNodes();
    return allNodes.filter(node => {
      if (node.id === this.tree.rootId) return false;
      const similarity = this.calculateSimilarity(node, nodeData);
      return similarity > 0.7; // Threshold for similarity
    });
  }

  mergeNodes(nodeId1, nodeId2) {
    console.log(`=== Merging nodes: ${nodeId1} and ${nodeId2} ===`);

    const node1 = this.getNode(nodeId1);
    const node2 = this.getNode(nodeId2);

    if (!node1 || !node2) {
      console.error('One or both nodes not found');
      return false;
    }

    // Merge properties
    const mergedNode = {
      name: `${node1.name} + ${node2.name}`,
      level: Math.max(node1.level, node2.level), // Use higher level
      inputs: [...new Set([...node1.inputs, ...node2.inputs])],
      outputs: [...new Set([...node1.outputs, ...node2.outputs])],
      successPrerequisites: [...new Set([...node1.successPrerequisites, ...node2.successPrerequisites])],
      failureBoundaries: [...new Set([...node1.failureBoundaries, ...node2.failureBoundaries])],
      parentId: node1.parentId,
      children: [...node1.children, ...node2.children],
      lastTriggered: new Date().toISOString(),
      usageCount: node1.usageCount + node2.usageCount,
      effectiveness: (node1.effectiveness + node2.effectiveness) / 2,
      status: 'active'
    };

    // Create new merged node
    const newNode = this.createNode(mergedNode, this.tree.rootId);
    this.tree.nodes[newNode.id] = newNode;

    // Update parent's children
    if (newNode.parentId && this.tree.nodes[newNode.parentId]) {
      const parent = this.tree.nodes[newNode.parentId];
      parent.children = parent.children.filter(id => id !== node1.id && id !== node2.id);
      parent.children.push(newNode.id);
    }

    // Update children's parentId
    newNode.children.forEach(childId => {
      if (this.tree.nodes[childId]) {
        this.tree.nodes[childId].parentId = newNode.id;
      }
    });

    // Remove original nodes
    this.removeNode(nodeId1);
    this.removeNode(nodeId2);

    this.saveTree();
    console.log(`✅ Nodes merged into: ${newNode.name}`);
    return newNode;
  }

  identifyPruningCandidates() {
    console.log('=== Identifying pruning candidates ===');

    const candidates = [];
    const allNodes = this.getAllNodes();
    const now = new Date();

    allNodes.forEach(node => {
      if (node.id === this.tree.rootId) return;

      // Check last triggered time (more than 30 days ago)
      const lastTriggered = new Date(node.lastTriggered);
      const daysSinceTriggered = (now - lastTriggered) / (1000 * 60 * 60 * 24);

      // Check usage count (less than 5 times)
      // Check effectiveness (less than 0.5)
      if (daysSinceTriggered > 30 || node.usageCount < 5 || node.effectiveness < 0.5) {
        candidates.push(node);
        node.status = 'candidate_for_pruning';
      }
    });

    if (candidates.length > 0) {
      this.saveTree();
      console.log(`✅ Identified ${candidates.length} pruning candidates`);
    } else {
      console.log('✅ No pruning candidates found');
    }

    return candidates;
  }

  pruneNode(nodeId) {
    return this.removeNode(nodeId);
  }

  // Task 4: Using capability tree for thinking
  findCapabilityPath(taskDescription) {
    console.log(`=== Finding capability path for: ${taskDescription} ===`);

    // Analyze task to identify required inputs and outputs
    const taskAnalysis = this.analyzeTask(taskDescription);

    // Search for relevant capabilities
    const relevantCapabilities = this.searchCapabilities(taskAnalysis);

    if (relevantCapabilities.length === 0) {
      console.log('No relevant capabilities found');
      return null;
    }

    // Sort by relevance
    relevantCapabilities.sort((a, b) => {
      const relevanceA = this.calculateCapabilityRelevance(a, taskAnalysis);
      const relevanceB = this.calculateCapabilityRelevance(b, taskAnalysis);
      return relevanceB - relevanceA;
    });

    console.log(`✅ Found ${relevantCapabilities.length} relevant capabilities`);
    return relevantCapabilities[0]; // Return most relevant
  }

  analyzeTask(taskDescription) {
    // Simple task analysis to identify inputs and outputs
    // In a real implementation, this would be more sophisticated
    return {
      inputs: ['task_description'],
      outputs: ['task_result'],
      keywords: taskDescription.toLowerCase().split(' ')
    };
  }

  searchCapabilities(taskAnalysis) {
    const allNodes = this.getAllNodes();
    return allNodes.filter(node => {
      if (node.id === this.tree.rootId) return false;

      // Check if capability is relevant to the task
      const relevance = this.calculateCapabilityRelevance(node, taskAnalysis);
      return relevance > 0.3; // Threshold for relevance
    });
  }

  calculateCapabilityRelevance(capability, taskAnalysis) {
    let relevance = 0;

    // Check input relevance
    const inputRelevance = this.calculateArraySimilarity(capability.inputs, taskAnalysis.inputs);
    relevance += inputRelevance * 0.4;

    // Check output relevance
    const outputRelevance = this.calculateArraySimilarity(capability.outputs, taskAnalysis.outputs);
    relevance += outputRelevance * 0.4;

    // Check keyword relevance
    const keywordRelevance = this.calculateKeywordRelevance(capability, taskAnalysis.keywords);
    relevance += keywordRelevance * 0.2;

    return relevance;
  }

  calculateKeywordRelevance(capability, keywords) {
    const capabilityText = `${capability.name} ${capability.inputs.join(' ')} ${capability.outputs.join(' ')}`.toLowerCase();
    const matchingKeywords = keywords.filter(keyword => capabilityText.includes(keyword));
    return matchingKeywords.length / keywords.length;
  }

  shouldCreateNewCapability(taskAnalysis) {
    // Check if existing capabilities are sufficient
    const relevantCapabilities = this.searchCapabilities(taskAnalysis);
    return relevantCapabilities.length === 0;
  }

  // Get tree statistics
  getStatistics() {
    const allNodes = this.getAllNodes();
    const levelCounts = {
      low: 0,
      medium: 0,
      high: 0
    };

    allNodes.forEach(node => {
      if (node.level in levelCounts) {
        levelCounts[node.level]++;
      }
    });

    return {
      totalNodes: allNodes.length,
      levelCounts: levelCounts,
      pruningCandidates: allNodes.filter(node => node.status === 'candidate_for_pruning').length,
      lastUpdated: this.tree.metadata.lastUpdated
    };
  }

  // Print tree structure
  printTree(nodeId = this.tree.rootId, indent = 0) {
    const node = this.getNode(nodeId);
    if (!node) return;

    const indentStr = '  '.repeat(indent);
    console.log(`${indentStr}- ${node.name} (${node.level}) [${node.status}]`);

    node.children.forEach(childId => {
      this.printTree(childId, indent + 1);
    });
  }
}

module.exports = CapabilityTree;