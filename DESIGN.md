---
version: alpha
name: Modern Scholar Portfolio
colors:
  primary: "#0f172a"
  secondary: "#64748b"
  accent: "#0ea5e9"
  accent-hover: "#0284c7"
  background: "#f8fafc"
  card-bg: "#ffffff"
  text-main: "#334155"
  text-heading: "#1e293b"
  border: "#e2e8f0"
typography:
  headline-display:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.25
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  nav-link:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 500
    letterSpacing: 0.05em
    textTransform: uppercase
spacing:
  xs: 8px
  sm: 16px
  md: 32px
  lg: 64px
  container: 1100px
rounded:
  sm: 4px
  md: 8px
  lg: 12px
---

# Jose Marichal: Digital Portfolio Design System

This document serves as the living source of truth for the visual identity of **josemarichal.github.io**. It ensures that AI agents and human contributors maintain a consistent, high-velocity academic aesthetic across all course syllabi, research pages, and portfolio projects.

## Overview

The brand personality is **"The Modern Scholar"**: authoritative and rooted in the classical liberal arts tradition (via serif typography), yet dynamic, transparent, and technology-forward (via clean sans-serif body text and high-contrast slate tones). The interface should feel spacious, academically rigorous, and highly legible.

## Colors

The palette is built on deep slates and navies to evoke permanence, with a vibrant sky-blue accent to signal interactivity and digital-native research.

- **Primary (#0f172a):** Deep Navy. Used for core branding, navigation highlights, and sub-headings.
- **Accent (#0ea5e9):** Sky Blue. Used for links, primary calls to action, and stylistic underlines.
- **Background (#f8fafc):** Off-white Slate. Provides a softer reading surface than pure white, reducing eye strain for long-form syllabi.
- **Text (#334155):** Slate 700. The primary color for all body copy to ensure optimal contrast without the harshness of pure black.

## Typography

The system uses a high-contrast pairing between a classic serif for authority and a geometric sans-serif for utility.

- **Headlines:** Set in **Playfair Display**. This establishes a timeless, intellectual voice. Display sizes should use tight letter spacing.
- **Body & Data:** Set in **Inter**. Chosen for its exceptional legibility at small sizes and high x-height, making it ideal for information-dense course schedules and reading lists.
- **Navigation:** Leveraged strictly uppercase labels with generous letter spacing to provide a clean, structural rhythm at the top of every page.

## Layout & Spacing

A strict **8px grid system** ensures consistent rhythm across all components.

- **Containment:** Related content (Biography, Project lists) should be grouped in white cards with **12px** corner radii to provide a modern, approachable feel.
- **Max Width:** To ensure readability, content containers are capped at **1100px**, preventing lines of text from becoming too long.

## Elevation

Hierarchy is achieved through subtle **box-shadows** and **blurs**.
- The main header uses an 8px backdrop blur to maintain contact with the underlying content while remaining distinct.
- Cards use a 1px slate border and a very soft 4px blur shadow to represent "lifting" from the off-white background.

## Shapes

The shape language balance "rigidity" and "modernity":
- **Bio & Project Cards:** 12px radius (Approachable).
- **Images & Buttons:** 8px radius (Precise).
- **Nav Underlines:** 2px stroke (Minimal).

## Do's and Don'ts

- **Do** use `Playfair Display` for all section headings to maintain the academic weight.
- **Don't** use the `#0ea5e9` accent for long paragraphs or large text blocks; it is for interaction only.
- **Do** ensure all cards have a 1px `#e2e8f0` border to maintain definition against the off-white background.
- **Don't** use more than three levels of information nesting; if deep nesting is required, use a table.
