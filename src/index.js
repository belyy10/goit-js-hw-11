import './css/styles.css';
import galleryCard from './templates/galleryCard.hbs'
import Notiflix, { Notify } from 'notiflix';
import apiFetch from "./js/fetch.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    searchEl: document.querySelector('#search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more')
}

refs.searchEl.addEventListener('submit',onSearch)
refs.loadMore.addEventListener ('click', onloadMore)

const fetchPhoto = new apiFetch ()

function onSearch (e) {
  e.preventDefault()
  refs.loadMore.classList.remove ('is-hidden')
  refs.galleryEl.innerHTML = ''
  fetchPhoto.query = e.currentTarget.elements.searchQuery.value.trim()
  fetchPhoto.resetPage()
  if(fetchPhoto===''){
    refs.loadMore.classList.add ('is-hidden')
    return Notify.info ('Enter your query')
  }
  refs.searchEl.reset()
  fetchPhoto.fetchApi().then(res => {
    getResponse(res)
      if (fetchPhoto.totalPages <=1) {
        refs.loadMore.classList.add ('is-hidden')
      }
  })
  .catch(e => {
    Notify.failure('Error Search')
  })
}
function onloadMore () {
  if (fetchPhoto.page > fetchPhoto.totalPages) {
    refs.loadMore.classList.add ('is-hidden')
    Notify.info ("We're sorry, but you've reached the end of search results.")
    return
  }
  fetchPhoto.fetchApi ().then (res => {
    getResponse(res)
  }).catch (e => {
    Notify.failure ('error Load More')
  })
}

function renderCard (hits) {
  const markup = galleryCard(hits)
  refs.galleryEl.insertAdjacentHTML ('beforeend', markup)
}

function getResponse (r) {
  renderCard (r)
  gallery.refresh()
}