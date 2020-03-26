module.exports = {
    /**
     * 
     * @param {string} id 
     * @param {string} imageUrl 
     * @param {string} imageName 
     */
    downloadImageInit(id, imageUrl, imageName) {
        var tgrA = document.getElementById(id),
            isIE = !!window.ActiveXObject || ("ActiveXObject" in window);

        if (isIE) {
            // IE 下载
            // var oBody = document.getElementsByTagName('body')[0],
            //     frame = document.createElement('iframe');
            // frame.src = './timg.jfif';
            // frame.name = "downloadIframe";
            // frame.style.display = 'none';
            // frame.width = 0;
            // frame.height = 0;

            // frame.addEventListener('load', function () { //绑定一个load方法，load完成触发下载
            //     window.frames["downloadIframe"].document.execCommand("SaveAs");
            // })
            // oBody.appendChild(frame);
        } else {
            tgrA.href = imageUrl;
            tgrA.download = imageName;
        }
    },
    /**
     * 点击下载图片
     * @param {string} id a标签id
     * @param {string} imageUrl 图片地址
     */
    downloadImage() {

        // if ()
    },
}