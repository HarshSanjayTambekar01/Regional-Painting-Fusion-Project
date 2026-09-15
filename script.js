const places = [
 {name:"Dholavira",city:"Gujarat",lat:23.886,lon:70.213,type:"architecture",period:"c. 2500–1900 BCE",known:"Indus Valley urban craft",artist:"Harappan communities",desc:"One of the great urban sites of the Indus Valley, Dholavira reveals a sophisticated visual and material culture through seals, ceramics, beadwork and monumental planning."},
 {name:"Sanchi",city:"Madhya Pradesh",lat:23.479,lon:77.739,type:"sculpture",period:"3rd c. BCE onward",known:"Stupa reliefs",artist:"Buddhist ateliers",desc:"Sanchi became a major centre of Buddhist architecture and narrative sculpture. Its gateways translate stories and symbols into a richly detailed stone language."},
 {name:"Ajanta",city:"Maharashtra",lat:20.551,lon:75.703,type:"painting",period:"2nd c. BCE–6th c. CE",known:"Cave paintings",artist:"Deccan workshops",desc:"Ajanta's painted caves preserve some of India's most celebrated early murals, combining expressive figures, storytelling and sophisticated colour modelling."},
 {name:"Ellora",city:"Maharashtra",lat:20.026,lon:75.179,type:"sculpture",period:"6th–10th c.",known:"Rock-cut temples",artist:"Regional stone carvers",desc:"Ellora brings Buddhist, Hindu and Jain monuments together in an extraordinary landscape of rock-cut architecture and sculpture."},
 {name:"Khajuraho",city:"Madhya Pradesh",lat:24.831,lon:79.919,type:"architecture",period:"10th–12th c.",known:"Temple sculpture",artist:"Chandela-era ateliers",desc:"Khajuraho's temples are celebrated for their dense sculptural programmes, where divinity, daily life, music and movement animate the architecture."},
 {name:"Chola",city:"Tamil Nadu",lat:10.787,lon:79.138,type:"sculpture",period:"9th–13th c.",known:"Chola bronzes",artist:"Chola bronze casters",desc:"The Chola period produced some of South Asia's most iconic bronze images, especially the dynamic dancing form of Shiva as Nataraja."},
 {name:"Hampi",city:"Karnataka",lat:15.335,lon:76.46,type:"architecture",period:"14th–16th c.",known:"Vijayanagara architecture",artist:"Vijayanagara ateliers",desc:"Hampi's monumental temples, bazaars and stone structures record the visual ambition of the Vijayanagara empire."},
 {name:"Pattachitra",city:"Odisha",lat:19.813,lon:85.831,type:"painting",period:"Medieval–present",known:"Ritual cloth painting",artist:"Chitrakara communities",desc:"Pattachitra is a highly disciplined painting tradition associated with Odisha, known for strong outlines, mythological narratives and natural pigments."},
 {name:"Madhubani",city:"Bihar",lat:26.35,lon:86.071,type:"folk",period:"Traditional–present",known:"Mithila painting",artist:"Mithila women artists",desc:"Mithila painting grew from domestic and ritual spaces into an internationally recognised folk tradition rich with symbolic plants, animals and deities."},
 {name:"Varanasi",city:"Uttar Pradesh",lat:25.317,lon:82.973,type:"textile",period:"Centuries–present",known:"Banarasi weaving",artist:"Master weaver communities",desc:"Varanasi is a major centre of silk weaving. Intricate brocade, zari and repeating motifs connect contemporary textiles to a long history of luxury craft."},
 {name:"Jaipur",city:"Rajasthan",lat:26.912,lon:75.787,type:"painting",period:"16th–19th c.",known:"Rajput miniature painting",artist:"Court ateliers",desc:"Jaipur and the wider Rajasthani courts nurtured miniature traditions depicting rulers, devotion, poetry, seasons and everyday courtly life."},
 {name:"Udaipur",city:"Rajasthan",lat:24.585,lon:73.712,type:"painting",period:"16th–19th c.",known:"Mewar painting",artist:"Mewar court painters",desc:"Mewar painting is known for vivid colour, devotional subjects and a distinctive relationship between landscape and narrative."},
 {name:"Delhi",city:"Delhi",lat:28.613,lon:77.209,type:"painting",period:"16th–19th c.",known:"Mughal painting",artist:"Imperial ateliers",desc:"Mughal ateliers transformed court painting through close observation, portraiture, manuscript illustration and exchanges between Persian and Indian traditions."},
 {name:"Kolkata",city:"West Bengal",lat:22.573,lon:88.364,type:"painting",period:"19th–20th c.",known:"Bengal School",artist:"Abanindranath Tagore & peers",desc:"The Bengal School sought a modern Indian visual identity by revisiting older Asian traditions while responding to colonial academic art."},
 {name:"Bastar",city:"Chhattisgarh",lat:19.07,lon:82.03,type:"folk",period:"Traditional–present",known:"Tribal metal craft",artist:"Bastar artisan communities",desc:"Bastar's bell-metal traditions transform local materials into ritual and everyday forms, carrying stories of community, ecology and belief."},
 {name:"Kutch",city:"Gujarat",lat:23.733,lon:69.859,type:"textile",period:"Traditional–present",known:"Embroidery & textiles",artist:"Kutch artisan communities",desc:"Kutch is home to a remarkable range of embroidery, weaving, printing and textile practices shaped by desert ecology and community identity."},
 {name:"Thanjavur",city:"Tamil Nadu",lat:10.787,lon:79.137,type:"painting",period:"18th–19th c.",known:"Tanjore painting",artist:"Thanjavur ateliers",desc:"Tanjore painting is recognised for devotional compositions, rich colours and relief ornament highlighted with gold foil and embellishment."},
 {name:"Kangra",city:"Himachal Pradesh",lat:32.1,lon:76.27,type:"painting",period:"18th–19th c.",known:"Pahari miniature",artist:"Kangra school painters",desc:"Kangra painting is celebrated for lyrical landscapes, delicate figures and poetic devotional scenes inspired by Krishna and classical literature."}
];

let current = 0, activeType = "all", query = "";
const map = L.map("map", {zoomControl:false, minZoom:4, maxZoom:8}).setView([22.5,79.5],5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'© OpenStreetMap contributors'}).addTo(map);
const markers = [];
const line = L.polyline(places.map(p=>[p.lat,p.lon]),{color:"#b94e2d",weight:1,opacity:.35,dashArray:"5 8"}).addTo(map);

function markerIcon(active=false){
 return L.divIcon({className:"custom-pin",html:`<span style="display:block;width:${active?15:11}px;height:${active?15:11}px;background:#b94e2d;border:3px solid #fffaf2;border-radius:50%;box-shadow:0 3px 12px #4a241555"></span>`,iconSize:[15,15],iconAnchor:[7,7]});
}
places.forEach((p,i)=>{
 const m=L.marker([p.lat,p.lon],{icon:markerIcon()}).addTo(map);
 m.bindTooltip(`<b>${p.name}</b><br><span>${p.city}</span>`,{direction:"top",offset:[0,-8]});
 m.on("click",()=>openModal(i));
 markers.push(m);
});

const list = document.getElementById("placeList");
function filtered(){
 return places.map((p,i)=>({p,i})).filter(({p})=>(activeType==="all"||p.type===activeType)&&(`${p.name} ${p.city} ${p.type} ${p.artist} ${p.known}`).toLowerCase().includes(query.toLowerCase()));
}
function renderList(){
 const arr=filtered();
 document.getElementById("resultCount").textContent=arr.length;
 list.innerHTML=arr.map(({p,i})=>`<div class="place ${i===current?'active':''}" data-i="${i}">
   <span class="num">${String(i+1).padStart(2,"0")}</span><div><h4>${p.name}</h4><p>${p.city} · ${p.type.replace("folk","folk & tribal")}</p></div><span class="place-arrow">↗</span></div>`).join("");
 list.querySelectorAll(".place").forEach(el=>el.addEventListener("click",()=>openModal(+el.dataset.i)));
}
function focusPlace(i){
 current=i; map.flyTo([places[i].lat,places[i].lon],6,{duration:.7});
 markers.forEach((m,j)=>m.setIcon(markerIcon(j===i)));
 renderList();
}
function openModal(i){
 current=i; const p=places[i];
 document.getElementById("modalType").textContent=p.type==="folk"?"FOLK & TRIBAL":p.type.toUpperCase();
 document.getElementById("modalIndex").textContent=`${String(i+1).padStart(2,"0")} / ${places.length}`;
 document.getElementById("modalTitle").textContent=p.name;
 document.getElementById("modalLocation").textContent=`${p.city} · India`;
 document.getElementById("modalDescription").textContent=p.desc;
 document.getElementById("modalPeriod").textContent=p.period;
 document.getElementById("modalKnown").textContent=p.known;
 document.getElementById("modalArtist").textContent=p.artist;
 document.getElementById("artVisual").innerHTML=`<span>${p.name.slice(0,2).toUpperCase()}</span>`;
 document.getElementById("modal").classList.add("open");
 focusPlace(i);
}
function closeModal(){document.getElementById("modal").classList.remove("open")}
document.getElementById("closeModal").onclick=closeModal;
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
document.getElementById("prev").onclick=()=>openModal((current-1+places.length)%places.length);
document.getElementById("next").onclick=()=>openModal((current+1)%places.length);
document.getElementById("search").addEventListener("input",e=>{query=e.target.value;renderList()});
document.getElementById("clearFilters").onclick=()=>{activeType="all";query="";document.getElementById("search").value="";document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("active",c.dataset.type==="all"));renderList()};
document.querySelectorAll(".chip").forEach(c=>c.onclick=()=>{activeType=c.dataset.type;document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x===c));renderList()});
document.getElementById("zoomIn").onclick=()=>map.zoomIn();document.getElementById("zoomOut").onclick=()=>map.zoomOut();document.getElementById("resetMap").onclick=()=>map.flyTo([22.5,79.5],5);
document.getElementById("randomBtn").onclick=()=>openModal(Math.floor(Math.random()*places.length));
document.querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>{const i=places.findIndex(p=>p.name===b.dataset.jump);if(i>=0){document.getElementById("explore").scrollIntoView({behavior:"smooth"});setTimeout(()=>openModal(i),500)}});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();document.getElementById("search").focus()}});
renderList();
