/* FAQ accordion — rotate icon on open/close */
document.querySelectorAll('details.faq-item').forEach(function(el) {
    el.addEventListener('toggle', function() {
        var icon = el.querySelector('.faq-icon');
        if (icon) {
            icon.style.transform = el.open ? 'rotate(45deg)' : '';
        }
    });
});
