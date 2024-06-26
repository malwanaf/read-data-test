let wrapper;
let header;
let isMouseDown = false;
let offsetX = 0;
let offsetY = 0;

export function init() {
    wrapper = document.querySelector("#wrapper");
    header = wrapper.querySelector("#header");
    
    header.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
}

export function toggleMaximize() {
    if (wrapper.classList.contains("w-full")) {
        wrapper.classList.remove("w-full");
        wrapper.classList.remove("h-full");
    } else {
        wrapper.classList.add("w-full");
        wrapper.classList.add("h-full");
    }

    wrapper.style.left = "";
    wrapper.style.top = "";
    wrapper.classList.add("left-0");
    wrapper.classList.add("top-0");
    wrapper.classList.add("right-0");
    wrapper.classList.add("bottom-0");
}

export function toggleMinimize() {
    let headerStyles = window.getComputedStyle(header);
    let headerHeight = headerStyles.height;

    if (!wrapper.classList.contains(`h-[${headerHeight}]`)) {
        wrapper.classList.add(`h-[${headerHeight}]`);
        wrapper.classList.add(`overflow-hidden`);
    } else {
        wrapper.classList.remove(`h-[${headerHeight}]`);
        wrapper.classList.remove(`overflow-hidden`);
    }
}

export function closeWindow() {
    wrapper.classList.add("hidden");
}

function handleMouseDown(e) {
    isMouseDown = true;
    offsetX = wrapper.offsetLeft - e.clientX;
    offsetY = wrapper.offsetTop - e.clientY;
    console.log(offsetX, offsetY);
}

function handleMouseMove(e) {
    if (!isMouseDown) return;
    e.preventDefault();
    let left = e.clientX + offsetX;
    let top = e.clientY + offsetY;
    wrapper.classList.remove("left-0");
    wrapper.classList.remove("top-0");
    wrapper.classList.remove("right-0");
    wrapper.classList.remove("bottom-0");
    wrapper.style.left = left + "px";
    wrapper.style.top = top + "px";
}

function handleMouseUp() {
    isMouseDown = false;
}
