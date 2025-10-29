# Travel Route Planner - Color Scheme Documentation

## Official Color Palette (Soft Pastels)

This document defines the complete color scheme used throughout the Travel Route Planner application.

### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Soft Teal | `#8EC5B1` | Primary buttons, header text, unselected nodes, metric values |
| Darker Teal | `#93B3AE` | Button hover states, gradient backgrounds |
| Light Green | `#AAE59B` | Secondary color, gradients, stats card background |
| Mint Green | `#95D6AA` | Stats card gradient, secondary highlights |

### Accent Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Purple-Pink | `#e69bed` | **Selected routes, highlighted paths, start nodes** |
| Soft Purple | `#ECBBEE` | Learning card background, accents |
| Soft Pink | `#FFB7DD` | End nodes, error messages, error card backgrounds |
| Peach | `#FFBABE` | Warning accents |
| Orange | `#FFC799` | Warning messages, info highlights |
| Yellow | `#FFDE7A` | Info card borders, highlights |
| Lime | `#F9F871` | Bright accents |
| Light Green | `#CDF086` | Success messages, subtle accents |

### UI Element Colors

| Element | Hex Code | Usage |
|---------|----------|-------|
| Background Gradient | `#8EC5B1` → `#AAE59B` | Body background (135deg) |
| Card Background | `#ffffff` | All card backgrounds |
| Text Primary | `#1e293b` | Main text, headings |
| Text Secondary | `#64748b` | Subtitles, labels, secondary text |
| Border Color | `#e2e8f0` | Card borders, input borders |

## Component-Specific Colors

### Graph Visualization

- **Unselected Nodes**: `#8EC5B1` (Soft Teal)
- **Selected/Highlighted Nodes**: `#e69bed` (Purple-Pink)
- **Start Node**: `#e69bed` (Purple-Pink)
- **End Node**: `#FFB7DD` (Soft Pink)
- **Unselected Routes**: `#C4D5CC` (Light gray-green, 40% opacity)
- **Selected Routes**: `#e69bed` (Purple-Pink, animated)
- **Route Labels**: White stroke with colored fill
- **India Outline**: `#d4e8e0` (Very subtle teal, 30% opacity)

### Cards & Backgrounds

- **Stats Card**: Gradient from `#8EC5B1` to `#95D6AA`
- **Results Card**: Gradient from `#E8F8F0` to `#D1F5E8`
- **Error Card**: Gradient from `#FFE8F3` to `#FFD4EA`
- **Learning Card**: Gradient from `#F0E8FF` to `#E6D9FF`
- **Info Card**: `#FFFAEC` with `#FFDE7A` left border

### Buttons

- **Primary Button**: `#8EC5B1` (normal), `#93B3AE` (hover)
- **Secondary Button**: `#64748b` (normal), `#1e293b` (hover)

### Interactive Elements

- **Form Focus Border**: `#8EC5B1`
- **Hover Effects**: Transform + shadow + color change
- **Active State**: Reset transform

## Design Principles

1. **Soft & Calming**: Use pastel colors to create a pleasant, professional look
2. **High Contrast for Text**: Ensure text is readable against all backgrounds
3. **Consistent Highlighting**: Purple-pink (#e69bed) for all selected/active states
4. **Gradient Harmony**: All gradients use colors from the same palette
5. **Subtle Map Elements**: Low opacity for non-essential map elements
6. **Bold Selection**: High contrast and animation for selected routes

## CSS Variables Reference

```css
:root {
    --primary-color: #8EC5B1;      /* Soft teal */
    --primary-dark: #93B3AE;       /* Darker teal */
    --secondary-color: #AAE59B;    /* Light green */
    --success-color: #e69bed;      /* Purple-pink for selected routes */
    --error-color: #FFB7DD;        /* Soft pink for errors */
    --warning-color: #FFC799;      /* Peach for warnings */
    --accent-purple: #ECBBEE;      /* Soft purple */
    --accent-pink: #FFB7DD;        /* Pink */
    --accent-peach: #FFBABE;       /* Peach */
    --accent-orange: #FFC799;      /* Orange */
    --accent-yellow: #FFDE7A;      /* Yellow */
    --accent-lime: #F9F871;        /* Lime */
    --accent-green: #CDF086;       /* Light green */
}
```

## Accessibility Notes

- All text colors meet WCAG AA standards for contrast
- Interactive elements have clear hover states
- Selected states use both color and size changes for clarity
- Error messages use color + icons for better communication

---

**Last Updated**: Current session
**Maintained By**: Travel Route Planner Development Team
