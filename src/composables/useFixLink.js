const fixLink = ( link ) => {
    const linkCut = link.indexOf('revision') - 1;
    
    return link.slice(0, linkCut);
}

export default fixLink