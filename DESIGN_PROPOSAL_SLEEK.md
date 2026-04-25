---
version: alpha
name: The Ethereal Scholar (Sleek Iteration)
description: A refined, high-end evolution of the Jose Marichal portfolio.
colors:
  primary: "#020617"      # Deepest Indigo-Slate
  accent: "#6366f1"       # Electric Indigo
  accent-soft: "#e0e7ff"  # Soft Indigo-Wash
  background: "#ffffff"   # Pure White
  surface: "#f8fafc"      # Airy Slate-50
  text-main: "#475569"    # Muted Slate-600
  text-heading: "#0f172a" # Deep Slate-900
  border: "rgba(0,0,0,0.04)"
typography:
  display:
    fontFamily: Fraunces
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.04em
  headline:
    fontFamily: Fraunces
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: Hanken Grotesk
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: 600
    letterSpacing: 0.1em
    textTransform: uppercase
spacing:
  container: 1000px        # Slightly narrower for focused reading
  gutter: 24px
  section: 96px
rounded:
  md: 16px                # Softer, more modern curves
  lg: 24px
---

# Design Proposal: The Ethereal Scholar

This iteration evolves the "Modern Scholar" aesthetic into something more **minimal, light-filled, and technically refined**. It moves away from standard "Web 2.0" shadows and borders in favor of depth achieved through white space and subtle tonal shifts.

## Overview

The "Ethereal Scholar" emphasizes **clarity and focus**. The interface feels "quiet" but "premium." It celebrates the transition between the analog world of political philosophy (via the characterful `Fraunces` serif) and the digital future (via the ultra-clean `Hanken Grotesk` sans).

## Colors

The palette shifts from high-contrast Navy to a **Deep Indigo base**.
- **Primary:** Instead of black, we use a very deep Indigo-Slate for a softer, more sophisticated "midnight" feel.
- **Accent:** A vibrant but refined **Indigo** replaces the Teal, providing a more "high-tech academic" vibe.
- **Glass Surfaces:** Content is housed in borderless "Glass" cards that use `rgba` for nearly invisible definition.

## Typography

- **The Serif:** `Fraunces` replaces Playfair. It is a "Soft-Serif" that is more contemporary, legible, and "sleek" while maintaining a scholarly weight.
- **The Sans:** `Hanken Grotesk` provides a more open, airy feel than Inter, making long syllabi feel less "dense."

## Layout & Depth

- **Vertical Rhythm:** Sections are separated by larger, more intentional gaps (`96px`), allowing each research project to "breathe."
- **Border-Free:** Move away from visible 1px borders. Use very subtle background color changes (`#f8fafc`) to define areas.
- **Micro-Shadows:** Shadows are replaced with "Ambient Occlusion"—very soft, large-radius blurs that look like paper on a light table rather than a box on a screen.

## Shapes

- **The "Squircle":** Corner radii are increased to `16px` and `24px` for a softer, more premium "iOS-like" quality.
- **Interactive States:** Buttons don't just change color; they use subtle scale transforms (`scale: 1.02`) and soft glows.

## Do's and Don'ts

- **Do** use pure white backgrounds for main content to maximize the "ethereal" light.
- **Don't** use dividers or horizontal lines; use whitespace to separate ideas.
- **Do** allow headlines to be extremely large if they are short.
- **Don't** use "pure black"; always use the Deep Indigo-Slate for text to maintain a premium feel.
