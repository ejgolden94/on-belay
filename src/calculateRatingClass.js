export function calculateRatingClass (rating) {
  if (rating[0]==='5'){
    rating = parseInt(rating.split('.')[1].replace(/\D/g,''))
    if (rating >= 0 && rating <= 5){
        return '#0D2E41'
    } else if (rating >= 6 && rating <= 9){
        return '#00798A'
    } else if (rating === 10){ 
        return '#44AD9F'
    } else if (rating === 11){
        return '#9EAE66'
    } else if (rating === 12){
        return '#F8AF2C'
    } else if (rating === 13){
        return '#F98830'
    } else if (rating === 14 || rating === 15){  
        return '#FA6135'
    } else {
        return '#333333'
    }
  } else if (rating[0]==='V'){
    rating = rating.slice(1)
    if (rating === 'B'){
        return '#0D2E41'
    } else{
        rating = parseInt(rating)
        if (rating === 0){
            return '#00798A'
        } else if (rating === 1){ 
            return '#44AD9F'
        } else if (rating === 2 || rating === 3){
            return '#9EAE66'
        } else if (rating >= 4 && rating <= 6){
            return '#F8AF2C'
        } else if (rating >= 7 && rating <= 9){
            return '#F98830'
        } else if (rating >= 10 && rating <= 16){  
            return '#FA6135'
        } else {
            return '#333333'
        }
    }
  } else {
    return '#333333'
  }
}