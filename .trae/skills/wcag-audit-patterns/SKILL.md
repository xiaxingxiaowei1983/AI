---
name: wcag-audit-patterns
description: Provides guidance on WCAG 2.1 accessibility guidelines and audit patterns for ensuring digital products are accessible to users with diverse abilities.
license: MIT
---

# WCAG Audit Patterns

This skill provides comprehensive guidance on WCAG 2.1 accessibility guidelines and audit patterns for ensuring digital products are accessible to users with diverse abilities.

## WCAG 2.1 Overview

### Core Principles
- **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive
- **Operable**: User interface components and navigation must be operable
- **Understandable**: Information and the operation of the user interface must be understandable
- **Robust**: Content must be robust enough that it can be interpreted reliably by a variety of user agents, including assistive technologies

### Compliance Levels
- **Level A**: The most basic accessibility features
- **Level AA**: Mid-range accessibility features (required by most regulations)
- **Level AAA**: The highest level of accessibility features

## Audit Patterns

### Perceivable

#### Text Alternatives
- **Images**: Provide alt text for all non-decorative images
- **Audio and Video**: Provide captions, transcripts, and audio descriptions
- **SVG**: Ensure SVG elements have appropriate text alternatives

#### Time-Based Media
- **Captions**: Provide captions for pre-recorded video content
- **Audio Description**: Provide audio descriptions for video content
- **Sign Language**: Consider providing sign language interpretation
- **Media Controls**: Ensure media controls are accessible

#### Adaptable
- **Semantic HTML**: Use proper HTML elements for their intended purpose
- **Responsive Design**: Ensure content adapts to different screen sizes
- **Separation of Content and Presentation**: Use CSS for presentation, not structure

#### Distinguishable
- **Color Contrast**: Ensure sufficient color contrast for text and UI elements
- **Text Size**: Allow users to resize text without loss of content or functionality
- **Visual Distractions**: Avoid flashing or blinking content that could trigger seizures
- **Focus Indicators**: Provide clear focus indicators for keyboard navigation

### Operable

#### Keyboard Accessible
- **Keyboard Navigation**: Ensure all functionality is accessible via keyboard
- **Keyboard Traps**: Avoid keyboard traps that prevent users from navigating away
- **Focus Order**: Ensure logical focus order that follows visual hierarchy

#### Enough Time
- **Time Limits**: Provide options to adjust or turn off time limits
- **Pause and Resume**: Allow users to pause, stop, or resume time-based content
- **Session Timeouts**: Provide warnings and options to extend session timeouts

#### Seizures and Physical Reactions
- **Flashing Content**: Avoid content that flashes more than 3 times per second
- **Photosensitive Seizures**: Provide mechanisms to avoid triggering seizures

#### Navigable
- **Page Navigation**: Provide ways to navigate to different pages and sections
- **Skip Links**: Provide skip navigation links at the beginning of pages
- **Site Maps**: Consider providing a site map for complex websites
- **Search Functionality**: Provide search functionality for large websites

#### Input Modalities
- **Alternative Input Methods**: Support different input modalities beyond keyboard
- **Mouse and Touch Targets**: Ensure sufficient size for touch and mouse targets
- **Pointer Gestures**: Provide alternatives to multi-point gestures

### Understandable

#### Readable
- **Language Identification**: Identify the primary language of the page
- **Reading Level**: Write content at a readable level
- **Abbreviations and Acronyms**: Provide expansions for abbreviations and acronyms

#### Predictable
- **Navigation Consistency**: Maintain consistent navigation across the website
- **Page Layout Consistency**: Keep page layouts consistent throughout the website
- **Feedback**: Provide clear feedback for user actions
- **Error Prevention**: Design to prevent errors from occurring

#### Input Assistance
- **Labels and Instructions**: Provide clear labels and instructions for form inputs
- **Error Identification**: Clearly identify and describe errors
- **Error Correction**: Provide suggestions for correcting errors
- **Confirmation**: Provide confirmation mechanisms for important actions

### Robust

#### Compatible
- **Assistive Technologies**: Ensure compatibility with assistive technologies
- **Browser Compatibility**: Test across different browsers and devices
- **Future Compatibility**: Use standard HTML, CSS, and JavaScript

#### Valid Code
- **HTML Validation**: Ensure HTML code is valid
- **ARIA Usage**: Use ARIA attributes correctly when needed
- **JavaScript Errors**: Avoid JavaScript errors that could break functionality

## Audit Process

### 1. Planning
- Define audit scope and objectives
- Identify target compliance level
- Gather necessary tools and resources
- Create an audit checklist

### 2. Automated Testing
- Use automated tools to scan for common issues
- Identify potential accessibility problems
- Generate initial audit report

### 3. Manual Testing
- Conduct keyboard navigation testing
- Test with screen readers
- Verify color contrast and visual elements
- Test form accessibility and error handling

### 4. User Testing
- Involve users with disabilities in testing
- Gather feedback on accessibility issues
- Identify usability problems

### 5. Analysis and Reporting
- Analyze audit findings
- Prioritize accessibility issues
- Create comprehensive audit report
- Develop remediation plan

## Tools and Resources

### Automated Testing Tools
- **WAVE**: Web Accessibility Evaluation Tool
- **Axe**: Accessibility testing engine
- **Lighthouse**: Google's performance and accessibility tool
- **Accessibility Insights**: Microsoft's accessibility testing tool

### Screen Readers
- **NVDA**: NonVisual Desktop Access (free)
- **JAWS**: Job Access With Speech (paid)
- **VoiceOver**: Apple's built-in screen reader

### Color Contrast Tools
- **WebAIM Color Contrast Checker**
- **Contrast Checker by Level Access**
- **Color Contrast Analyzer (CCA)**

### Learning Resources
- **WebAIM**: Web Accessibility In Mind
- **Mozilla Developer Network (MDN)**: Accessibility documentation
- **W3C Web Accessibility Initiative (WAI)**
- **A11Y Project**: Accessibility resources and patterns

## Best Practices

### Accessibility by Design
- Integrate accessibility into the design process from the beginning
- Create accessible design systems and components
- Train designers and developers on accessibility best practices

### Continuous Testing
- Test accessibility throughout the development process
- Implement automated accessibility testing in CI/CD pipelines
- Conduct regular accessibility audits

### Documentation
- Document accessibility features and requirements
- Create accessibility guidelines for your organization
- Maintain an accessibility statement

### User Involvement
- Involve users with disabilities in the design and testing process
- Gather feedback on accessibility issues
- Continuously improve based on user input

By following these WCAG audit patterns and best practices, you can ensure your digital products are accessible to all users, regardless of their abilities or disabilities.