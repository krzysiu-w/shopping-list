 import _ from 'lodash';
 import '../scss/style.scss';
 import 'bootstrap';
 import "@fortawesome/fontawesome-free/js/all.js";
 import PageHandler from './components/PageHandler';

$(function() {
    let handlePage = new PageHandler();
    handlePage.init();
})


