---
name: swiftui-ui-patterns
description: Provides guidance on SwiftUI UI patterns, components, and best practices for building iOS, iPadOS, macOS, watchOS, and tvOS applications.
license: MIT
---

# SwiftUI UI Patterns

This skill offers comprehensive guidance on SwiftUI UI patterns, components, and best practices for building applications across Apple platforms.

## Core Concepts

### Declarative UI
- Understand SwiftUI's declarative approach to UI development
- Learn how to describe UI state rather than imperative updates
- Master the use of SwiftUI views and modifiers

### View Composition
- Create reusable and composable view components
- Use stacks, containers, and layouts effectively
- Build complex UIs from simple, reusable parts

### State Management
- Understand SwiftUI's state management system
- Use @State, @Binding, @ObservedObject, @EnvironmentObject, and @StateObject
- Implement efficient state updates and propagation

### Data Flow
- Create unidirectional data flow in SwiftUI applications
- Implement MVVM and other architectural patterns
- Ensure data consistency across the application

## UI Patterns

### Navigation
- Implement navigation stacks and navigation links
- Create tab views and page views
- Design effective navigation hierarchies

### Lists and Tables
- Build dynamic lists with List and ForEach
- Implement table views for macOS
- Add swipe actions, reordering, and section headers

### Forms and Input
- Create user-friendly forms
- Implement various input controls
- Add form validation and error handling

### Cards and Containers
- Design effective card-based UIs
- Create custom containers and layouts
- Use stacks and grids for organized content

### Modal Windows and Sheets
- Present modal views and sheets
- Implement custom modal transitions
- Design effective modal interfaces

### Animation and Transitions
- Add smooth animations to UI elements
- Implement custom transitions
- Create interactive and engaging animations

### Dark Mode and Accessibility
- Support dark mode and dynamic type
- Ensure accessibility compliance
- Design for different device sizes and orientations

## Components

### Basic Components
- Text, Image, Button, TextField, Toggle, Slider
- Stepper, Picker, DatePicker, ColorPicker
- ProgressView, ActivityIndicator

### Layout Components
- HStack, VStack, ZStack
- LazyHStack, LazyVStack, LazyHGrid, LazyVGrid
- GeometryReader, Spacer, Divider

### Control Components
- Button styles and customization
- TextField styles and input handling
- Toggle and switch designs

### Navigation Components
- NavigationView, NavigationStack, NavigationLink
- TabView, PageView
- Sidebar navigation for macOS and iPadOS

### Container Components
- List, ForEach, Section
- ScrollView, ScrollViewReader
- Group, GroupBox, DisclosureGroup

## Best Practices

### Performance Optimization
- Use lazy loading for large lists
- Implement efficient state updates
- Optimize view rendering and redrawing

### Code Organization
- Structure SwiftUI code effectively
- Create reusable view components
- Implement clear and maintainable architectures

### Cross-Platform Development
- Build apps that work across Apple platforms
- Handle platform-specific differences
- Use conditional views and modifiers

### Testing and Debugging
- Test SwiftUI views effectively
- Debug common SwiftUI issues
- Use SwiftUI previews for rapid iteration

## Tools and Resources

### Recommended Tools
- Xcode and SwiftUI Previews
- Swift Playgrounds
- Simulator for testing on different devices
- Accessibility Inspector

### Learning Resources
- Apple's SwiftUI documentation
- SwiftUI tutorials and courses
- SwiftUI books and blogs
- Open source SwiftUI projects

## Implementation Examples

### Basic View
```swift
struct ContentView: View {
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("Count: \(count)")
                .font(.largeTitle)
            Button(action: { count += 1 }) {
                Text("Increment")
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(8)
            }
        }
        .padding()
    }
}
```

### Navigation Example
```swift
struct ContentView: View {
    var body: some View {
        NavigationStack {
            List {
                NavigationLink(destination: DetailView()) {
                    Text("Go to Detail View")
                }
            }
            .navigationTitle("Main View")
        }
    }
}

struct DetailView: View {
    var body: some View {
        Text("Detail View")
            .navigationTitle("Detail")
    }
}
```

SwiftUI provides a modern, declarative approach to building user interfaces across Apple platforms, enabling developers to create beautiful and responsive applications with less code.