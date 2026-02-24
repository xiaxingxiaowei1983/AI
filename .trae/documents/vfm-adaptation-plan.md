# VFM Protocol Adaptation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: Analyze Differences Between Existing and New VFM Protocols
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - Compare the existing 5-dimension VFM system with the new 4-dimension protocol
  - Analyze scoring differences (0-1 vs 0-10 scale)
  - Identify weight differences and threshold requirements
- **Success Criteria**:
  - Detailed comparison document highlighting all key differences
  - Clear understanding of how to map existing dimensions to new ones
- **Test Requirements**:
  - `programmatic` TR-1.1: Document all dimension comparisons with mapping recommendations
  - `human-judgement` TR-1.2: Ensure analysis is comprehensive and covers all aspects of both protocols
- **Notes**: Pay special attention to the weight changes and scoring scale differences

## [x] Task 2: Update Value Function Core Implementation
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - Modify the value-function.js file to support the new 4-dimension VFM protocol
  - Update scoring scale from 0-1 to 0-10
  - Implement new weight system (3x, 3x, 2x, 2x)
  - Add threshold check (minimum 50 total score)
- **Success Criteria**:
  - Value function correctly calculates scores using the new protocol
  - Threshold check properly filters low-value capabilities
- **Test Requirements**:
  - `programmatic` TR-2.1: All test capabilities pass with expected scores
  - `programmatic` TR-2.2: Low-value capabilities below threshold are correctly filtered
  - `human-judgement` TR-2.3: Code changes are clear and maintainable
- **Notes**: Ensure backward compatibility or add migration path if needed

## [x] Task 3: Update Evolution Queue Manager
- **Priority**: P1
- **Depends On**: Task 2
- **Description**:
  - Update evolution-queue-manager.js to use the new VFM scoring system
  - Modify threshold check to use the new 50-point minimum
  - Update queue prioritization logic based on new scoring
- **Success Criteria**:
  - Evolution queue correctly prioritizes capabilities using new scoring
  - Low-value capabilities are properly filtered
- **Test Requirements**:
  - `programmatic` TR-3.1: Queue manager correctly processes capabilities with new scores
  - `programmatic` TR-3.2: Queue prioritization matches expected order
- **Notes**: Test with both high and low value capabilities to ensure proper filtering

## [x] Task 4: Update Capability Tree Structure
- **Priority**: P1
- **Depends On**: Task 1
- **Description**:
  - Analyze the provided capability tree structure
  - Update capability-tree.js to align with the new structure if needed
  - Ensure all nodes and tools are properly integrated
- **Success Criteria**:
  - Capability tree matches the provided structure
  - All tools and nodes are properly registered
- **Test Requirements**:
  - `programmatic` TR-4.1: Capability tree correctly loads all nodes and tools
  - `human-judgement` TR-4.2: Capability tree structure matches the provided specification
- **Notes**: Pay attention to the specific tool names and node hierarchies

## [x] Task 5: Create Integration Test for New VFM Protocol
- **Priority**: P1
- **Depends On**: Tasks 2, 3, 4
- **Description**:
  - Create or update test file to test the new VFM protocol
  - Test capability scoring with new dimensions and weights
  - Test evolution queue management with new threshold
  - Test capability tree integration
- **Success Criteria**:
  - All tests pass with the new VFM protocol
  - Test coverage includes all key functionality
- **Test Requirements**:
  - `programmatic` TR-5.1: All test cases pass
  - `programmatic` TR-5.2: Test coverage includes both high and low value capabilities
- **Notes**: Use the provided low-value examples as test cases

## [ ] Task 6: Update Documentation
- **Priority**: P2
- **Depends On**: All previous tasks
- **Description**:
  - Update existing documentation to reflect the new VFM protocol
  - Document changes to the capability tree structure
  - Update any related diagrams or flowcharts
- **Success Criteria**:
  - Documentation is up-to-date with all changes
  - New protocol is clearly explained
- **Test Requirements**:
  - `human-judgement` TR-6.1: Documentation is clear and comprehensive
  - `human-judgement` TR-6.2: All changes are properly documented
- **Notes**: Ensure documentation matches the actual implementation

## [ ] Task 7: Final Verification and Testing
- **Priority**: P1
- **Depends On**: All previous tasks
- **Description**:
  - Run comprehensive tests to verify all components work together
  - Test edge cases and boundary conditions
  - Ensure system stability with the new protocol
- **Success Criteria**:
  - All tests pass successfully
  - System operates correctly with the new VFM protocol
- **Test Requirements**:
  - `programmatic` TR-7.1: Comprehensive test suite passes
  - `human-judgement` TR-7.2: System behaves as expected in real-world scenarios
- **Notes**: Test with actual capability candidates from the PCEC system

## Implementation Notes

1. **Key Differences to Address**:
   - Scoring scale: 0-1 (existing) vs 0-10 (new)
   - Dimensions: 5 (existing) vs 4 (new)
   - Weights: Equal weights (existing) vs weighted (3x, 3x, 2x, 2x) (new)
   - Threshold: 0.3 (existing) vs 50 (new)

2. **Mapping Recommendations**:
   - Existing "reuseFrequency" → New "HighFrequency"
   - Existing "failureRateImpact" → New "Failure Reduction"
   - Existing "cognitiveLoadReduction" → New "User Burden"
   - Existing "reasoningCostReduction" → New "Self Cost"
   - Existing "systemCertainty" → To be distributed across other dimensions

3. **Testing Strategy**:
   - Use the provided low-value examples as test cases
   - Test both passing and failing capabilities
   - Verify queue prioritization with mixed-value capabilities

4. **Backward Compatibility**:
   - Consider adding a compatibility layer to support both protocols
   - Document migration path for existing capabilities

5. **Performance Considerations**:
   - Ensure scoring calculations remain efficient with the new scale
   - Test queue management performance with large numbers of capabilities

This plan outlines the steps needed to adapt our existing value function mutation system to the new VFM protocol while maintaining compatibility and ensuring system stability.