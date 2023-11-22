import { Notyf } from 'notyf';
const notyf = new Notyf({
    duration: 2000,
    position: {
        x: 'right',
        y: 'top',
    },
});


export const showSpinner = () => {
    var loadingDiv = document.getElementById('loading');
    console.log(loadingDiv)
    loadingDiv.style.visibility = 'visible';
}

export const hideSpinner = () => {
    var loadingDiv = document.getElementById('loading');
    console.log(loadingDiv)
    loadingDiv.style.visibility = 'hidden';

}
export default notyf
