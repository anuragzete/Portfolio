
    let devtoolsOpen = false;

    const detectDevTools = () => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                alert("DevTools detected! Please close it to continue.");
                window.location.href = 'about:blank';
            }
        } else {
            devtoolsOpen = false;
        }
    };

    window.addEventListener('resize', detectDevTools);
    setInterval(detectDevTools, 500);

    document.addEventListener('contextmenu', (event) => event.preventDefault());

    window.addEventListener('keydown', (event) => {
        if (event.key === 'F12' ||
            (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J')) ||
            (event.ctrlKey && event.key === 'U')) {
            event.preventDefault();
        }
    });
