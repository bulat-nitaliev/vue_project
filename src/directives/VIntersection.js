

export default {
    mounted(el,binding){
        const options = {
            rootMargin: '5px',
            threshold: 0.5
        }

        // функция обратного вызова
        let callback = (entries, observer)=>{
            if (entries[0].isIntersecting){
                binding.value()
            }
        }

        // наблюдатель
        let observer = new IntersectionObserver(callback, options)
        observer.observe(el)
    },
    name: 'intersection'
}