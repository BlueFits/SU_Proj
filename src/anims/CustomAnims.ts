export const fade = {
    from: { opacity: 0 },
    to: { opacity: 1 }
};

export const  fadeAndSlide = {
    from: { opacity: 0, transform: 'translateY(100px)' }, // Start hidden & below the viewport
    to: { opacity: 1, transform: 'translateY(0)' }     // Slide into view
}