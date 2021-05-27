const formatDate = (dateString,format='') => {
    const d = new Date(dateString)
    let dateOptions = {}
    if (format === 'long'){
        dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }
    return d.toLocaleDateString('en',dateOptions)
}

export {formatDate}