// Essay content. Use **text** for bold emphasis within paragraphs.
const essays = [
  {
    "slug": "the-guide-to-navigating-the-modern-day-world-consumption",
    "title": "The guide to navigating the modern day world - Consumption",
    "author": "Patrick Amberson",
    "category": "Essays",
    "year": "2026",
    "date": "2026",
    "intro": "Hopefully there is nothing put forward here that you have not implemented in some way, but in the off chance there is, let this be your guide.",
    "paragraphs": [
      "Hopefully there is nothing put forward here that you have not implemented in some way, but in the off chance there is, let this be your guide."
    ],
    "sections": [
      {
        "title": "Nothing is “free”, you are paying for access in one way or another",
        "paragraphs": [
          "Let’s use the crop of new “agents” popping up as an example. The agent is “free”, it promises to help you schedule your meetings, order your groceries when you’re running low, buy and sell items for you. However, they are without a doubt extracting value from your use; most likely through your data. Once you understand that nothing is free, the question of consumption in this case becomes “is it worth it for me to give up my data/ privacy in exchange for this tool?”. It could very well be. The point is, **always** investigate the price you are paying in exchange for something, especially when it’s “free”"
        ]
      },
      {
        "title": "Everyone is out to get you",
        "paragraphs": [
          "Everyone and everything is out to get you. You must be skeptical at all times. Is this eBay seller going to ship me a product that has some undisclosed issues? Will this rental car company try and claim damages on my returned vehicle that should not be attributed to me? Will my employer keep my wages low even when my contribution to the bottom line is increasing? The answer is most likely… They aren’t doing anything wrong. It’s in your best interest to always be skeptical. Guilty until proven innocent."
        ]
      },
      {
        "title": "Companies are made of people",
        "paragraphs": [
          "Once you realize that a company is merely a sum of people and their competing interests, it comes to no surprise that your interests are likely to be misaligned. The human interest is to earn money. And more specifically to earn that money from **you. **Will Apple provide software “updates” that increase the life span of your current iPhone when they can nudge you to discard it for a new one in 2 years? Will Mercedes align my warranty period to give me the best window of protection against the service life of my car parts? Will Mondelez warn me that consistently eating Oreos & Sour Patch Kids has been linked to increases in the risk of dementia, cognitive decline, and vascular brain injury? Of course not!! They are acting in the “interest” of their company, and so must you. What are the risks associated with this? Is it worth it to me? Do I need to “update” my software? You should ask yourself these questions when interacting with a company, however big or small."
        ]
      },
      {
        "title": "Everyone is lying to you, your instinct is the best data point you have.",
        "paragraphs": [
          "Finding “honest” information isn’t easy. The scientific studies you’ve been cited are probably not from a neutral point of view. The post on IG from a health influencer is likely curated by a “sponsor”. There’s too much money at stake for honesty to be the default assumption. The same goes the other way, should you listen to the TikTok guru telling you that all vaccines are bad for you? Probably not, even they have their own ulterior motives! The supossed food pyramid guidance provided by the governments are subject to influence from lobbyists from the meat industry for example. Does that mean that having more meat is bad? That’s not what I’m implying. All I’m saying is we have biologically evolved to be able to make sense of information subconsciously that our conscious mind doesn’t have the capacity to. In this era those instincts might be more important than ever. Use them!"
        ]
      },
      {
        "title": "Nothing matters… probably",
        "paragraphs": [
          "With all of that being said, nothing probably matters. You cannot stop the world from evolving, and you especially cannot orchestrate the direction of evolution. Focus on your own life and don’t get too consumed with what’s going on beyond you. Your time is limited, spend it on people/things that bring you joy."
        ]
      }
    ]
  }
];
const gallery = [
  {src:'assets/stock-exchange.jpg',caption:'The first stock exchange.'},
  {src:'assets/automata.jpeg',caption:'One of the first depictions of automata.'},
  {src:'assets/banknotes-1935.jpg',caption:'Bank of Canada banknotes — 1935: The First Series.'}
];
let selectedPhoto=0;
function selectPhoto(index){
  selectedPhoto=index;
  const photo=gallery[index];
  const image=document.querySelector('#document');
  image.src=photo.src;image.alt=photo.caption;
  document.querySelector('#caption').textContent=photo.caption;
  document.querySelectorAll('#thumbnails button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
}
const yearNav = document.querySelector('#years');
const titleNav = document.querySelector('#titles');
const menu = document.querySelector('#menu');
let selectedYear = essays[0].year;
let selectedEssay = essays[0];
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const formatText = value => escapeHTML(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
function render() {
  document.querySelector('.document-figure').hidden=false;
  const years = [...new Set(essays.map(essay => essay.year))].sort((a,b) => Number(b)-Number(a));
  const visible = essays.filter(essay => essay.year === selectedYear);
  yearNav.innerHTML = years.map(year=>`<button class="${year===selectedYear?'selected':''}" aria-pressed="${year===selectedYear}" data-year="${year}">${year}</button>`).join('');
  titleNav.innerHTML = visible.map(essay=>`<a class="${essay.slug===selectedEssay.slug?'selected':''}" href="#essay/${essay.slug}" ${essay.slug===selectedEssay.slug?'aria-current="page"':''}>${escapeHTML(essay.title)}</a>`).join('');
  document.querySelector('#breadcrumb').textContent = `Writing ${selectedEssay.year}`;
  document.querySelector('#essay').innerHTML = `${selectedEssay.author?`<p class="byline">By ${escapeHTML(selectedEssay.author)}</p>`:''}${selectedEssay.paragraphs.map(paragraph=>`<p>${formatText(paragraph)}</p>`).join('')}${selectedEssay.sections?.length?`<ol class="essay-points">${selectedEssay.sections.map(section=>`<li><h2>${escapeHTML(section.title)}</h2>${section.paragraphs.map(paragraph=>`<p>${formatText(paragraph)}</p>`).join('')}</li>`).join('')}</ol>`:''}`;
  selectPhoto(selectedPhoto);
  document.title = `${selectedEssay.title} — The Writing Room`;
  renderIndex();
}
function route(){
  const slug = location.hash.replace('#essay/','');
  const essay = essays.find(item=>item.slug===slug);
  if(essay){selectedEssay=essay;selectedYear=essay.year;}
  render();
}
function chooseYear(year){
  const essay=essays.find(item=>item.year===year);
  if(!essay)return;
  selectedYear=year;selectedEssay=essay;
  history.replaceState(null,'',`#essay/${essay.slug}`);render();
}
function renderIndex(){
  const query=document.querySelector('#index-search').value.trim().toLowerCase();
  const matches=essays.filter(essay=>`${essay.title} ${essay.author || ''} ${essay.year} ${essay.category} ${essay.paragraphs.join(' ')} ${(essay.sections || []).map(section=>`${section.title} ${section.paragraphs.join(' ')}`).join(' ')}`.toLowerCase().includes(query));
  const years=[...new Set(matches.map(essay=>essay.year))].sort((a,b)=>Number(b)-Number(a));
  document.querySelector('#index-count').textContent=query ? `${matches.length} ${matches.length===1?'match':'matches'}` : `${essays.length} ${essays.length===1?'essay':'essays'} in the archive`;
  menu.querySelector('nav').innerHTML=years.length ? years.map(year=>{
    const group=matches.filter(essay=>essay.year===year);
    return `<details ${query || year===selectedYear?'open':''}><summary>${escapeHTML(year)} <span>${group.length} ${group.length===1?'essay':'essays'}</span></summary><div class="index-entries">${group.map(essay=>`<a href="#essay/${essay.slug}" ${essay===selectedEssay?'aria-current="page"':''}>${escapeHTML(essay.title)}</a>`).join('')}</div></details>`;
  }).join('') : '<p class="index-empty">No essays found. Try a different word or year.</p>';
}
function closeIndex(restoreFocus=false){menu.hidden=true;document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');if(restoreFocus)document.querySelector('#menu-toggle').focus();}
yearNav.addEventListener('click',event=>{const button=event.target.closest('[data-year]');if(button)chooseYear(button.dataset.year);});
document.querySelector('#menu-toggle').addEventListener('click',()=>{
  if(!menu.hidden){closeIndex();return;}
  menu.hidden=false;document.querySelector('#menu-toggle').setAttribute('aria-expanded','true');
  renderIndex();document.querySelector('#index-search').focus();
});
document.querySelector('#close-menu').addEventListener('click',()=>closeIndex(true));
document.querySelector('#index-search').addEventListener('input',renderIndex);
menu.addEventListener('click',event=>{if(event.target.closest('a')){closeIndex();document.querySelector('#essay').focus();}});
document.addEventListener('click',event=>{if(!menu.hidden && !menu.contains(event.target) && !event.target.closest('#menu-toggle'))closeIndex();});
const zoom=document.querySelector('#zoom');
document.querySelector('#enlarge').addEventListener('click',()=>{document.querySelector('#zoom-content').innerHTML=`<figure>${document.querySelector('#document').outerHTML.replace(' id="document"','')}<figcaption>${escapeHTML(gallery[selectedPhoto].caption)}</figcaption></figure>`;zoom.showModal();});
document.querySelector('#close-zoom').addEventListener('click',()=>zoom.close());
document.addEventListener('keydown',event=>{if(event.key==='Escape' && !menu.hidden)closeIndex(true);});
window.addEventListener('hashchange',route);
const thumbnails = document.querySelector('#thumbnails');
thumbnails.innerHTML=gallery.map((photo,index)=>`<button data-photo="${index}" aria-label="${escapeHTML(photo.caption)}" aria-pressed="${index===0}"><img src="${photo.src}" alt=""></button>`).join('');
thumbnails.addEventListener('click',event=>{const button=event.target.closest('[data-photo]');if(button)selectPhoto(Number(button.dataset.photo));});
route();
document.querySelector('#archive-reset').addEventListener('click',()=>{chooseYear([...new Set(essays.map(essay=>essay.year))].sort((a,b)=>Number(b)-Number(a))[0]);});
