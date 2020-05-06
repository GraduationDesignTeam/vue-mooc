function isImage(ext) {
    return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].
    indexOf(ext.toLowerCase()) !== -1;
}

function isVideo(ext) {
    return ['mp4', 'rmvb', 'rm', 'avi', 'wmv', 'mpg', 'mpeg', 'mov', 'mkv'].
    indexOf(ext.toLowerCase()) !== -1;
}

function isPowerPoint(ext) {
    return ['ppt', 'pptx'].
    indexOf(ext.toLowerCase()) !== -1;
}

function isWordDoc(ext) {
    return ['doc', 'docx'].
    indexOf(ext.toLowerCase()) !== -1;
}

function isExcelDoc(ext) {
    return ['xls', 'xlsx'].
    indexOf(ext.toLowerCase()) !== -1;
}

function isAudio(ext) {
    return ['wav', 'mp3'].
    indexOf(ext.toLowerCase()) !== -1;
}

function isCompressedPackage(ext) {
    return ['rar', 'zip'].
    indexOf(ext.toLowerCase()) !== -1;
}

export function resolveFileType(fileName) {
    if(fileName.lastIndexOf('.') === -1)
        return '未知';
    let ext = fileName.substring(fileName.lastIndexOf('.')+1);
    if(isImage(ext))
        return '图片';
    if(isVideo(ext))
        return '视频';
    if(isAudio(ext))
        return '音频';
    if(isPowerPoint(ext))
        return '幻灯片';
    if(isWordDoc(ext))
        return 'Word文档';
    if(isExcelDoc(ext))
        return 'Excel表';
    if(isCompressedPackage(ext))
        return '压缩包';
    return '未知';
}