export function registerLightBox() {
    
    document.addEventListener('click' ,(event) => {
        const {target} = event;
        
        if(target.tagName != 'IMG' || target.dataset.img != 'imgGroup') return;

        const imgList = document.querySelectorAll(`img[data-img="${target.dataset.img}"]`);
        const index = [...imgList].findIndex((x) => x == target);
    })
}