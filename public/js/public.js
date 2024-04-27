let imagesToLoad = document.querySelectorAll('img[data-src]');

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
}

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((products, observer) => {
        products.forEach((product) => {
            if (product.isIntersecting) {
                loadImages(product.target);
                observer.unobserve(product.target);
            }
        });
    });

    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}