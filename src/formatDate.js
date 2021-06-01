const formatDate = (dateString,format='') => {
    const d = new Date(dateString)
    let dateOptions = {}
    if (format.includes('long')){
        dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }
    if (format.includes('time')){
        return d.toLocaleDateString('en',dateOptions) + ' ' +  d.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'})
    } else {
        return d.toLocaleDateString('en',dateOptions)
    }
}

export {formatDate}