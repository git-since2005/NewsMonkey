import React, { Component, createRef } from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import NewsItem from './NewsItem'


export default class NewsSpace extends Component {
  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1,
      input: ' ',
      showBar: 'visible'
    }
    this.show = React.createContext({start:0, end: 16})
  }

  handleSubmit=(event)=>{
    this.setState({input:event.target.value})
  }

  handleHide=()=>{
    this.setState({showBar:'hidden'})
  }
  handleShow=()=>{
    this.setState({showBar:'visible'})
  }

  articles = [
    {
      "source": {
        "id": null,
        "name": "Gizmodo.com"
      },
      "author": "Matt Novak",
      "title": "Conspiracy Theories Run Wild Amid Mass U.S. Cell Outage",
      "description": "Wireless customers with AT&T, Cricket Wireless, T-Mobile, and Verizon all reported outages across the country this morning. And just like clockwork, some folks online pounced on the disruption as evidence of a global conspiracy. Read more...",
      "url": "https://gizmodo.com/conspiracy-theories-run-wild-amid-mass-u-s-cell-outage-1851278496",
      "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/938b00f825486c3cd1f363cde2b442ab.gif",
      "publishedAt": "2024-02-22T17:45:00Z",
      "content": "Wireless customers with AT&amp;T, Cricket Wireless, T-Mobile, and Verizon all reported outages across the country this morning. And just like clockwork, some folks online pounced on the disruption as… [+4084 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "England leg-spinner Ahmed to leave tour of India",
      "description": "England leg-spinner Rehan Ahmed is leaving the tour of India because of an urgent family matter and will not return.",
      "url": "https://www.bbc.co.uk/sport/cricket/68330145",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/11787/production/_124395517_bbcbreakingnewsgraphic.jpg",
      "publishedAt": "2024-02-23T03:33:06Z",
      "content": "England leg-spinner Rehan Ahmed is leaving the tour of India because of an urgent family matter and will not return.\r\nThe 19-year-old was not selected for the fourth Test in Ranchi, which begins on F… [+1105 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Every chance Stokes will bowl in fourth Test - Pope",
      "description": "There is \"every chance\" England captain Ben Stokes will bowl in the fourth Test against India in Ranchi, says vice-captain Ollie Pope.",
      "url": "https://www.bbc.co.uk/sport/cricket/68337474",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/3F48/production/_132700261_benstokes.jpg",
      "publishedAt": "2024-02-21T08:33:46Z",
      "content": "Ben Stokes is three wickets short of doing the double of 200 wickets and 6,000 runs in Test cricket\r\nThere is \"every chance\" England captain Ben Stokes will bowl in the fourth Test against India in R… [+2785 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "CNET"
      },
      "author": "Kevin Lynch",
      "title": "Cricket Livestream: How to Watch India vs. England, 3rd Test From Anywhere - CNET",
      "description": "The teams head to Rajkot with the series delicately poised at 1-1.",
      "url": "https://www.cnet.com/tech/services-and-software/cricket-livestream-how-to-watch-india-vs-england-3rd-test-from-anywhere/",
      "urlToImage": "https://www.cnet.com/a/img/resize/2bdfce7f3894dcab2c36b2230253396834993c36/hub/2024/02/14/9804bf0c-507f-4d62-9480-7712067e3d5d/gettyimages-1987451210.jpg?auto=webp&fit=crop&height=675&width=1200",
      "publishedAt": "2024-02-15T01:00:05Z",
      "content": "Injury-ravaged India will be looking to build on their battling performance in the second Test as they face off with England once more for the third Test of the series in Rajkot. \r\nThe hosts leveled … [+9047 chars]"
    },
    {
      "source": {
        "id": "time",
        "name": "Time"
      },
      "author": "Solcyré Burga",
      "title": "What to Know About the Cellular Outages Happening Across the U.S.",
      "description": "More than 70,000 customers have been impacted by outages across AT&T’s network Thursday morning, causing internet and cellular service outages.",
      "url": "https://time.com/6757936/att-outage-cell-service-verizon-tmobile/",
      "urlToImage": "https://api.time.com/wp-content/uploads/2024/02/cellular-outages-us.jpg?quality=85",
      "publishedAt": "2024-02-22T16:04:28Z",
      "content": "More than 70,000 customers have been impacted by outages across AT&amp;Ts network Thursday morning, causing internet and cellular service outages, according to Downdetector. \r\nAbout 1 in 2 customers … [+2079 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": "https://www.facebook.com/bbcnews",
      "title": "Pakistan elections: Against the odds, Khan's PTI proves support is solid",
      "description": "Pakistan's election saw candidates aligned to the former PM spring a surprise, writes Caroline Davies.",
      "url": "https://www.bbc.co.uk/news/world-asia-68257232",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/0ADC/production/_132608720_51b601a75e731d30d0a944fe52576ecc8d1b9a06.jpg",
      "publishedAt": "2024-02-09T21:45:15Z",
      "content": "Today's results are both clear and complicated.\r\nIndependent candidates - many of whom would have run under the banner of the PTI party but were prevented from doing so - have taken the largest numbe… [+2940 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Slashdot.org"
      },
      "author": "EditorDavid",
      "title": "AT&T Will Issue $5 Reimbursements For 12-Hour Outage",
      "description": "CNN reports:\n\nAT&T is reimbursing customers for the nearly 12-hour network outage on Thursday, the company announced in a news release. The mobile network will issue a $5 credit to \"potentially impacted\" AT&T Wireless customers, which it says is the \"average …",
      "url": "https://slashdot.org/story/24/02/25/1758242/att-will-issue-5-reimbursements-for-12-hour-outage",
      "urlToImage": "https://a.fsdn.com/sd/topics/att_64.png",
      "publishedAt": "2024-02-25T19:34:00Z",
      "content": "CNN reports:\r\nAT&amp;T is reimbursing customers for the nearly 12-hour network outage on Thursday, the company announced in a news release. The mobile network will issue a $5 credit to \"potentially i… [+1298 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": "https://www.facebook.com/bbcnews",
      "title": "The spin maestro who defied odds to reach 500 wickets",
      "description": "India's Ravichandran Ashwin is the ninth bowler in the history of cricket to claim 500 Test wickets",
      "url": "https://www.bbc.co.uk/news/world-asia-india-68093666",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/129DC/production/_132425267_gettyimages-1495969032-594x594.jpg",
      "publishedAt": "2024-02-19T23:10:06Z",
      "content": "Of the nine bowlers who have claimed 500 Test wickets, India's Ravichandran Ashwin - who has joined the club now - is by far the best batter with five centuries. \r\nHad Ashwin, 37, chosen to focus on … [+4393 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "MacRumors"
      },
      "author": "Joe Rossignol",
      "title": "AT&T Giving $5 Credit to Customers Following Major Network Outage",
      "description": "AT&T has announced that it will be providing impacted customers with a $5 bill credit per account as compensation for the network's major network outage across the U.S. on Thursday. The credits will automatically be applied within two bill cycles, it said.\n\n\n…",
      "url": "https://www.macrumors.com/2024/02/25/att-crediting-customers-for-network-outage/",
      "urlToImage": "https://images.macrumors.com/t/Q28PlGgCpONG6X7kTprXn7vSrc8=/1600x/article-new/2024/02/ATT-Banner.jpeg",
      "publishedAt": "2024-02-25T19:02:21Z",
      "content": "AT&amp;T has announced that it will be providing impacted customers with a $5 bill credit per account as compensation for the network's major outage across the U.S. on Thursday. The credits will auto… [+2153 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": "https://www.facebook.com/bbcnews",
      "title": "Pakistan elections 2024: Count under way after controversial election",
      "description": "Election officials are calling for results to be speeded up, after delays in announcing vote tallies.",
      "url": "https://www.bbc.co.uk/news/world-asia-68223977",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/A53B/production/_132599224_countepa.jpg",
      "publishedAt": "2024-02-08T22:58:34Z",
      "content": "Votes are being counted in Pakistan after Thursday's general election which was marred by the suspension of mobile phone services and violent unrest.\r\nResults have been slow to come out, prompting el… [+4614 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Masterful Root hundred rallies England in Ranchi",
      "description": "Joe Root returns to form when England need him most with a masterful century on the first day of the fourth Test against India in Ranchi.",
      "url": "https://www.bbc.co.uk/sport/cricket/68378994",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/F3C2/production/_132720426_rootgetty.jpg",
      "publishedAt": "2024-02-23T11:05:44Z",
      "content": "Joe Root's century was patiently compiled in 219 balls\r\n<table><tr><th>Fourth Test, Ranchi (day one of five)</th></tr>\r\n<tr><td>England 302-7: Root 106*, Foakes 47; Deep 3-70</td></tr><tr><td>India: … [+5354 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "'Not every Test has to put Bazball on trial'",
      "description": "The negative reaction to England's third Test defeat by India was disproportionate and they will not change their approach for the fourth Test. says Stephan Shemilt.",
      "url": "https://www.bbc.co.uk/sport/cricket/68367939",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/B997/production/_132711574_benstokes.jpg",
      "publishedAt": "2024-02-22T13:00:40Z",
      "content": "India v England: Ben Stokes says England will adapt to Ranchi pitch\r\nIt is not advisable to play cards against Ben Stokes.\r\nAfter the bluff of not playing in a World Cup that he played in, he is now … [+5075 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "ReadWrite"
      },
      "author": "Sophie Atkinson",
      "title": "Massive AT&T outage caused by software update not cyber attack, company says",
      "description": "Thousands of people in the US were unable to make calls – even to 911 – yesterday due to a […]\nThe post Massive AT&T outage caused by software update not cyber attack, company says appeared first on ReadWrite.",
      "url": "https://readwrite.com/massive-att-outage-caused-by-software-update-not-cyber-attack-company-says/",
      "urlToImage": "https://readwrite.com/wp-content/uploads/2024/02/telephone-586268_1280.jpg",
      "publishedAt": "2024-02-23T12:34:58Z",
      "content": "Thousands of people in the US were unable to make calls – even to 911 – yesterday due to a massive outage. Concerns around a cyber attack were spread on social media, but AT&amp;T now confirms this w… [+2005 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Android Central"
      },
      "author": "nandika.iyerravi@futurenet.com (Nandika Ravi)",
      "title": "AT&T suffers major outage following massive solar flares",
      "description": "Over 70,000 users faced cellular outages in the USA this morning. Some speculate that two powerful X-class solar flares caused this.",
      "url": "https://www.androidcentral.com/phones/carriers/att-outage-follows-massive-solar-flares",
      "urlToImage": "https://cdn.mos.cms.futurecdn.net/hexgLWo223NKu6zfbeEqcK-1200-80.jpg",
      "publishedAt": "2024-02-22T19:51:09Z",
      "content": "<ul><li>AT&amp;T subscribers have reported outages on Thursday morning, including those on the company's MVNO carriers.</li><li>T-Mobile and Verizon users also appear to be affected by the outage.</l… [+3450 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Android Central"
      },
      "author": "bradypsnyder@gmail.com (Brady Snyder)",
      "title": "Google brings a bit of Pixel call magic to more Android phones",
      "description": "Google is testing Talk to a Live Representative in Search, which works similarly to Hold for Me on Pixel, with the caveat that Talk to a Live Representative initiates calls independently.",
      "url": "https://www.androidcentral.com/apps-software/google-search-labs-talk-to-live-representative",
      "urlToImage": "https://cdn.mos.cms.futurecdn.net/zSCpd8kkF78z2AMLqK4jAn-1200-80.jpg",
      "publishedAt": "2024-02-16T04:37:06Z",
      "content": "<ul><li>Google is testing a new feature in Google Search Labs that will call a company's customer service line on your behalf.</li><li>It's called Talk to a Live Representative, and it cuts out the n… [+3457 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "CNET"
      },
      "author": "Kevin Lynch",
      "title": "Cricket Livestream: How to Watch India vs. England, 4th Test From Anywhere - CNET",
      "description": "Can the hosts seal a series victory in Ranchi?",
      "url": "https://www.cnet.com/tech/services-and-software/cricket-livestream-how-to-watch-india-vs-england-4th-test-from-anywhere/",
      "urlToImage": "https://www.cnet.com/a/img/resize/1ae5603c7d6793d20fdd47a6d362853cf7cdee5e/hub/2024/02/22/ccb26452-e1f2-4cee-804d-96b521dd6569/gettyimages-2019439684.jpg?auto=webp&fit=crop&height=675&width=1200",
      "publishedAt": "2024-02-23T01:00:25Z",
      "content": "Having put in a dismal performance in the third Test in Rajkot, Ben Stokes and his England team know they will have to improve significantly if they're to save the series as they take on India in the… [+9235 chars]"
    },
    {
      "source": {
        "id": "time",
        "name": "Time"
      },
      "author": "Charlie Campbell",
      "title": "Pakistan’s Military Used Every Trick to Sideline Imran Khan—and Failed. Now What?",
      "description": "Preliminary results of Pakistan’s election Thursday seem to show surprising success by Imran Khan’s repressed PTI party. What that means for the future of the country is uncertain.",
      "url": "https://time.com/6693147/pakistan-election-results-imran-khan-pti-military/",
      "urlToImage": "https://api.time.com/wp-content/uploads/2024/02/Pakistan-Election-Results.jpg?quality=85",
      "publishedAt": "2024-02-09T08:05:00Z",
      "content": "Hes been shot, jailed, had his political party effectively banned, and name purged from mainstream media. But you just cant keep Imran Khan down.\r\nPreliminary results from Thursdays election in Pakis… [+5556 chars]"
    },
    {
      "source": {
        "id": "time",
        "name": "Time"
      },
      "author": "Solcyré Burga",
      "title": "What to Do If Your iPhone Is Stuck in SOS Mode",
      "description": "Tens of thousands have lost cell phone service due to AT&T’s network outage. Many have been faced with cell phones stuck in SOS modes.",
      "url": "https://time.com/6763916/iphone-stuck-in-sos-mode-what-to-do/",
      "urlToImage": "https://api.time.com/wp-content/uploads/2024/02/GettyImages-1961995314.jpg?quality=85",
      "publishedAt": "2024-02-22T17:54:14Z",
      "content": "Tens of thousands of Americans lost cell phone service due to AT&amp;Ts network outages on Thursday morning, causing concern about users' access to emergency helplines. Many customers have been faced… [+2160 chars]"
    },
    {
      "source": {
        "id": "time",
        "name": "Time"
      },
      "author": "P R Sanjai / Bloomberg",
      "title": "Disney, Reliance Sign $8.5 Billion Deal to Merge India Media Operations",
      "description": "Disney and billionaire Mukesh Ambani’s conglomerate have signed a binding pact to merge their media operations in India, creating a sector behemoth valued at $8.5 billion.",
      "url": "https://time.com/6836167/disney-reliance-merger-deal/",
      "urlToImage": "https://api.time.com/wp-content/uploads/2024/02/GettyImages-1853383830.jpg?quality=85",
      "publishedAt": "2024-02-28T20:57:12Z",
      "content": "Walt Disney Co. and billionaire Mukesh Ambanis conglomerate have signed a binding pact to merge their media operations in India, creating a sector behemoth valued at $8.5 billion in one of the worlds… [+2648 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Wagner announces retirement from international cricket",
      "description": "New Zealand pace bowler Neil Wagner fights back tears as he announces his retirement from international cricket.",
      "url": "https://www.bbc.co.uk/sport/av/cricket/68411739",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/18096/production/_132745489_p0hf9ky7.jpg",
      "publishedAt": "2024-02-27T11:15:16Z",
      "content": "New Zealand's fifth-highest Test wicket-taker Neil Wagner said he had been on an emotional \"rollercoaster\" as he announced his retirement from international cricket. \r\nThe left-arm seamer, 37, made t… [+183 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "'Bazball' more than just attacking cricket - Dravid",
      "description": "India head coach Rahul Dravid says 'Bazball' is more than just attacking cricket after his side beat England by 106 runs in the second Test.",
      "url": "https://www.bbc.co.uk/sport/av/cricket/68208454",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/DDB3/production/_132555765_p0h950yb.jpg",
      "publishedAt": "2024-02-05T15:02:12Z",
      "content": "'Bazball' more than just attacking cricket - Dravid. Video, 00:01:00'Bazball' more than just attacking cricket - Dravid"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": "https://www.facebook.com/bbcnews",
      "title": "Mehrauli: A mosque demolished, and orphans displaced in India",
      "description": "Authorities have demolished a 600-year-old mosque in Delhi, claiming it was illegally built on forest land.",
      "url": "https://www.bbc.co.uk/news/world-asia-india-68137664",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/545E/production/_132589512_mosque.jpg",
      "publishedAt": "2024-02-09T00:21:12Z",
      "content": "Fawad says his favourite colour is green. \r\nThe 12-year-old loved looking at the grass, leaves and trees around the mosque where he lived and studied in India's capital Delhi. He moved here two years… [+9326 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "/FILM"
      },
      "author": "staff@slashfilm.com (Danielle Ryan)",
      "title": "No, Macaulay Culkin Doesn't Play Cricket On It's Always Sunny, But You Might Recognize Who Does",
      "description": "Contrary to popular belief, David Hornsby plays the put-upon priest Rickety Cricket on It&amp;#39;s Always Sunny in Philadelphia, not Macaulay Culkin.",
      "url": "https://www.slashfilm.com/1504072/its-always-sunny-in-philadelphia-macaulay-culkin-not-cricket-david-hornsby/",
      "urlToImage": "https://www.slashfilm.com/img/gallery/no-macaulay-culkin-doesnt-play-cricket-on-its-always-sunny-but-you-might-recognize-who-does/l-intro-1706545236.jpg",
      "publishedAt": "2024-02-04T22:45:07Z",
      "content": "The ultimate put-upon priest isn't played by Macaulay Culkin but is instead portrayed by actor, writer, and producer David Hornsby. Hornsby has known the \"It's Always Sunny\" guys for some time and he… [+987 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Destructoid"
      },
      "author": "Zoey Handley",
      "title": "Devolver published Cricket Through the Ages is coming to PC and Switch March 1",
      "description": "Devolver Digital has announced that Cricket Through the Ages, the absolutely normal take on the sport from Terra Nil and Broforce developer Free Lives, is escaping mobile confinement and releasing on PC and Switch on March 1.\n\n\nAs a Canadian, I know next to n…",
      "url": "https://www.destructoid.com/devolver-published-cricket-through-the-ages-is-coming-to-pc-and-switch-march-1/",
      "urlToImage": "https://www.destructoid.com/wp-content/uploads/2024/02/Cricket_08.jpg",
      "publishedAt": "2024-02-16T20:42:30Z",
      "content": "Devolver Digital has announced that Cricket Through the Ages, the absolutely normal take on the sport from Terra Nil and Broforce developer Free Lives, is escaping mobile confinement and releasing on… [+1548 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "South Africa cricket great Procter dies aged 77",
      "description": "Former South Africa all-rounder Mike Procter dies aged 77, his family say.",
      "url": "https://www.bbc.co.uk/sport/cricket/68292770",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/120F5/production/_132637937_gettyimages-81733529.jpg",
      "publishedAt": "2024-02-17T19:44:25Z",
      "content": "Mike Procter (left) and Barry Richards both had limited international careers as South Africa were banned between 1970 and 1991\r\nFormer South Africa all-rounder Mike Procter has died aged 77, his fam… [+1557 chars]"
    },
    {
      "source": {
        "id": "al-jazeera-english",
        "name": "Al Jazeera English"
      },
      "author": "Al Jazeera",
      "title": "Pakistan Cricket Board terminates bowler Haris Rauf’s contract",
      "description": "The national cricket body ends the fast bowler's central contract after he refused to play in Australia Test series.",
      "url": "https://www.aljazeera.com/sports/2024/2/15/pakistan-cricket-board-terminate-bowler-haris-raufs-contract",
      "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2024/02/2023-10-27T000000Z_668413276_UP1EJAR17C19I_RTRMADP_3_CRICKET-WORLDCUP-PAK-ZAF-1708009926.jpg?resize=1200%2C630",
      "publishedAt": "2024-02-15T15:35:55Z",
      "content": "The Pakistan Cricket Board (PCB) has terminated the central contract of fast bowler Haris Rauf after he refused to join the Test team for the tour of Australia, which coincided with his stint at Aust… [+1593 chars]"
    },
    {
      "source": {
        "id": "al-jazeera-english",
        "name": "Al Jazeera English"
      },
      "author": "Kevin Hand",
      "title": "Test cricket needed India’s ‘fantastic’ Jaiswal and England’s Bazball",
      "description": "Former England captain Mike Gatting heaps praise on India and England's approach ahead of fourth Test in Ranchi.",
      "url": "https://www.aljazeera.com/sports/2024/2/22/test-cricket-needed-indias-fantastic-jaiswal-and-englands-bazball",
      "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2024/02/2024-02-18T074838Z_26492389_UP1EK2I0LP03K_RTRMADP_3_CRICKET-TEST-IND-ENG-1708611730.jpg?resize=1920%2C1440",
      "publishedAt": "2024-02-22T15:06:55Z",
      "content": "India and England have been backed to keep playing the magnificent brand of cricket that has lit up the series despite criticism from some parts.\r\nThe teams face each other in the fourth Test in Ranc… [+6040 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Ponting named coach of MLC side Washington Freedom",
      "description": "Former Australia captain Ricky Ponting is named coach of Major League Cricket (MLC) side Washington Freedom on a two-year contract.",
      "url": "https://www.bbc.co.uk/sport/cricket/68226045",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/13495/production/_132579987_gettyimages-1499156685.jpg",
      "publishedAt": "2024-02-07T09:43:06Z",
      "content": "Ricky Ponting made 560 appearances for Australia across all formats between 1995 and 2012\r\nFormer Australia captain Ricky Ponting has been named coach of Major League Cricket (MLC) side Washington Fr… [+1414 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Kent red-ball return to Tunbridge Wells 'unlikely'",
      "description": "Kent's chief executive Simon Storey says it is unlikely the Nevill Ground will host any more County Championship matches.",
      "url": "https://www.bbc.co.uk/sport/cricket/68370344",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/1712F/production/_132711549_nevill_v2_220224_gt.jpg",
      "publishedAt": "2024-02-22T13:11:24Z",
      "content": "Kent are unbeaten in their last 10 matches at the Nevill Ground\r\nKent's chief executive Simon Storey has said it is unlikely Tunbridge Wells will host any more County Championship matches.\r\nKent have… [+1366 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Loftie-Eaton hits fastest T20 international century",
      "description": "Namibia's Jan Nicol Loftie-Eaton breaks the record for the fastest century in T20 international cricket with a 33-ball hundred against Nepal.",
      "url": "https://www.bbc.co.uk/sport/cricket/68413224",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/851A/production/_132747043_jan_nicol_loftie_eaton_getty.jpg",
      "publishedAt": "2024-02-27T11:12:18Z",
      "content": "Coming in 62-3, Jan Nicol Loftie-Eaton helped Namibia post 206-4\r\n<table>\r\n<tr><td>Tri-nations T20 series, Kirtipur</td></tr><tr><td>Namibia 206-4 (20 overs): Loftie-Eaton 101 (36), Kruger 59* (48)</… [+942 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Pakistan end Rauf's contract for Australia tour refusal",
      "description": "The Pakistan Cricket Board terminates fast bowler Haris Rauf's central contract after he refused to go on the Test tour of Australia.",
      "url": "https://www.bbc.co.uk/sport/cricket/68305608",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/17633/production/_132659759_gettyimages-1748799769.jpg",
      "publishedAt": "2024-02-15T13:46:56Z",
      "content": "Haris Rauf has played one Test, 37 one-day internationals and 66 T20s for Pakistan\r\nThe Pakistan Cricket Board has terminated fast bowler Haris Rauf's central contract after he refused to go on the T… [+1183 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Digital Trends"
      },
      "author": "Joe Maring",
      "title": "Everything you need to know about the AT&T outage happening right now",
      "description": "It's not just you. As of Thursday, February 22, 2024, AT&T is experience a large service outage. Here's a recap of what you need to know!",
      "url": "https://www.digitaltrends.com/mobile/att-outage-february-2024-service-down-fixed-when-news/",
      "urlToImage": "https://www.digitaltrends.com/wp-content/uploads/2022/05/5g-mmwave-tower.jpg?resize=1200%2C630&p=1",
      "publishedAt": "2024-02-22T14:56:35Z",
      "content": "Ericsson\r\nHappy Thursday morning! February is drawing to a close, the weather is getting a little bit warmer in parts of the country, and AT&amp;T is experiencing a massive outage for its cellular an… [+2322 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Digital Trends"
      },
      "author": "Tim Keeney",
      "title": "SC Freiburg vs Bayern live stream: Can you watch for free?",
      "description": "Bayern Munich take on SC Freiburg in Bundesliga action today. Here's how to watch a live stream of the match if you live in the US.",
      "url": "https://www.digitaltrends.com/movies/sc-freiburg-vs-bayern-live-stream-march-2024/",
      "urlToImage": "https://www.digitaltrends.com/wp-content/uploads/2023/02/PSG-vs-Bayern-Feature.jpeg?resize=1200%2C630&p=1",
      "publishedAt": "2024-03-01T14:00:34Z",
      "content": "After an important win over RB Leipzig last weekend, Bayern Munich look to keep pace atop the Bundesliga when they take on SC Freiburg at Europa-Park Stadion today. Bayern secured three points with a… [+2170 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": "https://www.facebook.com/bbcnews",
      "title": "Imran Khan: Pakistan ex-PM and wife Bushra Bibi jailed for illegal marriage",
      "description": "The court voids Khan's marriage with a faith healer, in the latest case against the Pakistani ex-PM.",
      "url": "https://www.bbc.co.uk/news/world-asia-68192196",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/3962/production/_132509641_0221f6910879a68be9bf8f08a17de3342c65d754342_262_1243_6991243x699.jpg",
      "publishedAt": "2024-02-03T13:55:09Z",
      "content": "A Pakistani court has jailed Imran Khan and his wife for seven years after voiding their marriage, in the latest sentence against the ex-prime minister. \r\nThe court ruled that Khan's 2018 marriage wi… [+2528 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "AppleInsider"
      },
      "author": "news@appleinsider.com (Malcolm Owen)",
      "title": "AT&T will pay a miserly $5 per account in outage compensation",
      "description": "AT&T will be providing bill credits to customers over the major February 22 outage, but the $5 credit will be paid on a per-account basis instead of per line.An AT&T logo on a buildingOn February 22, AT&T suffered from an outage that affected its cellular net…",
      "url": "https://appleinsider.com/articles/24/02/26/att-will-pay-a-miserly-5-per-account-in-outage-compensation",
      "urlToImage": "https://photos5.appleinsider.com/gallery/58725-119697-48236-94216-43901-85407-71DEDC23-59BD-4319-8304-3F09C50FA3C8-xl-xl-xl.jpg",
      "publishedAt": "2024-02-26T12:02:45Z",
      "content": "An AT&amp;T logo on a building\r\nAT&amp;T will be providing bill credits to customers over the major February 22 outage, but the $5 credit will be paid on a per-account basis instead of per line. \r\nOn… [+1632 chars]"
    },
    {
      "source": {
        "id": "business-insider",
        "name": "Business Insider"
      },
      "author": "insider@insider.com (Brendan Griffiths)",
      "title": "AFCON third-place playoff: How to watch free South Africa vs. DR Congo live stream from anywhere",
      "description": "There's a free South Africa vs. DR Congo live stream for today's consolation prize match at AFCON.",
      "url": "https://www.businessinsider.com/guides/streaming/afcon-where-to-watch-free-south-africa-vs-dr-congo-live-stream",
      "urlToImage": "https://i.insider.com/65c7a7c96fcb546d2d4e46a3?width=1200&format=jpeg",
      "publishedAt": "2024-02-10T17:30:01Z",
      "content": "When you buy through our links, Business Insider may earn an affiliate commission. Learn more\r\nIt's the game neither team really wants to be in, but it at least gives a chance to ease the pain of the… [+7215 chars]"
    },
    {
      "source": {
        "id": "al-jazeera-english",
        "name": "Al Jazeera English"
      },
      "author": "Al Jazeera",
      "title": "Preview: India vs Australia – ICC Under-19 Cricket World Cup final",
      "description": "India's under-19 team will be eager to avenge their senior team's loss to Australia in the Cricket World Cup final.",
      "url": "https://www.aljazeera.com/sports/2024/2/10/india-vs-australia-under-19-icc-cricket-world-cup-final-preview",
      "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2024/02/Uday-Saharan-of-India-speaks-to-his-side-in-the-huddle-ahead-of-the-ICC-U19-Mens-Cricket-World-Cup-South-Africa-2024-Semi-Final-match-between-India-and-South-Africa-at-Willowmoore-Park-on-February-06-2024-in-Ben-1707209619.jpg?resize=1920%2C1440",
      "publishedAt": "2024-02-10T14:34:49Z",
      "content": "Who: India vs AustraliaWhat: ICC Under-19 Cricket World Cup finalWhen: Sunday, February 11, 2024, 10am (08:00 GMT)Where: Willowmoore Park, Benoni, South Africa\r\nIndias Under-19 team step onto the fie… [+4206 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Science Daily"
      },
      "author": null,
      "title": "By growing animal cells in rice grains, scientists dish up hybrid food",
      "description": "From lab-grown chicken to cricket-derived protein, these innovative alternatives offer hope for a planet struggling with the environmental and ethical impacts of industrial agriculture. Now, scientists add a new recipe to the list -- cultured beef rice -- by …",
      "url": "https://www.sciencedaily.com/releases/2024/02/240214122601.htm",
      "urlToImage": "https://www.sciencedaily.com/images/scidaily-icon.png",
      "publishedAt": "2024-02-14T17:26:01Z",
      "content": "From lab-grown chicken to cricket-derived protein, these innovative alternatives offer hope for a planet struggling with the environmental and ethical impacts of industrial agriculture. Now, Korean s… [+3130 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Tanishq Vaddi",
      "title": "Interview: Mind guru Paddy Upton on why batting is proving difficult – ‘Decline in concentration due to intensity and volume of T20 games’",
      "description": "'There is a difference between attention focus in T20 Cricket and Test cricket. In T20 cricket the intensity of focus is high and it is a broad focus. In Tests, the focus needs to be regulated,' Paddy Upton tells The Indian Express.",
      "url": "https://indianexpress.com/article/sports/cricket/mind-guru-paddy-upton-on-why-batting-is-proving-difficult-9155055/",
      "urlToImage": "https://images.indianexpress.com/2024/02/Upton.png",
      "publishedAt": "2024-02-10T15:42:43Z",
      "content": "One of the trends so far in the ongoing Test series between India and England is a lot of batsmen have gotten off to starts but haven’t been able to build that into a long innings. In Hyderabad, Olli… [+6430 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "AppleInsider"
      },
      "author": "news@appleinsider.com (Stephen Silver)",
      "title": "Crime blotter: No Apple Vision Pro crime wave, at least not yet",
      "description": "In the latest Apple Crime Blotter, a viral Apple Store theft check-in, AirTag may have been used to plan a murder, and a lack of major Apple Vision Pro crimes.The Apple Store on Bay Street in Emeryville, CA The latest in an occasional AppleInsider series, loo…",
      "url": "https://appleinsider.com/articles/24/02/18/crime-blotter-no-apple-vision-pro-crime-wave-at-least-not-yet",
      "urlToImage": "https://photos5.appleinsider.com/gallery/58594-119419-applebaystreet-xl.jpg",
      "publishedAt": "2024-02-18T12:05:19Z",
      "content": "The Apple Store on Bay Street in Emeryville, CA \r\nIn the latest Apple Crime Blotter, a viral Apple Store theft check-in, AirTag may have been used to plan a murder, and a lack of major Apple Vision P… [+5852 chars]"
    },
    {
      "source": {
        "id": "time",
        "name": "Time"
      },
      "author": "Charlie Campbell",
      "title": "Pakistan’s Elections Are Being Brazenly Rigged. Why Doesn’t the U.S. Seem to Care?",
      "description": "The Biden Administration may yet regret not taking a stronger stance to protect in Pakistan the democratic values it claims to hold so dear.",
      "url": "https://time.com/6663747/pakistan-imran-khan-election-democracy-us/",
      "urlToImage": "https://api.time.com/wp-content/uploads/2024/02/imran-khan-pakistan-election.jpg?quality=85",
      "publishedAt": "2024-02-05T08:00:00Z",
      "content": "For a man staring down the barrel of a 10-year jail sentence, Imran Khan was oddly nonchalant in court last Tuesday. As his representatives argued passionately for a fair hearing, Pakistans ex-Prime … [+8528 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Patience pays off as Ireland make Test breakthrough",
      "description": "Ireland chalk up another landmark success as they overcome Afghanistan in Abu Dhabi to to secure a first Test victory.",
      "url": "https://www.bbc.co.uk/sport/cricket/68446583",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/76E6/production/_132783403_genericcele.jpg",
      "publishedAt": "2024-03-01T18:23:29Z",
      "content": "Lorcan Tucker celebrates as he runs through to seal Ireland's victory over Afghanistan at the Tolerance Oval,\r\nThe omens were not good as Ireland made their entrance to the Test arena on a spring day… [+3605 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Glamorgan sign Pakistan seam bowler Hamza",
      "description": "Glamorgan sign Pakistan international seam bowler Mir Hamza for the start of the 2024 season.",
      "url": "https://www.bbc.co.uk/sport/cricket/68444186",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/A030/production/_132780014_gettyimages-1905948675.jpg",
      "publishedAt": "2024-03-01T10:00:08Z",
      "content": "Mir Hamza (R), pictured playing for Karachi Kings, took the prized wicket of Australia great Steve Smith in his most recent Test for Pakistan in January\r\nGlamorgan have signed Pakistan international … [+1811 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Yahoo Entertainment"
      },
      "author": null,
      "title": "Americans reporting nationwide cellular outages from AT&T, Cricket Wireless and other providers",
      "description": null,
      "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_23380a49-779a-4ac9-b4ab-e4d7717fbb53",
      "urlToImage": null,
      "publishedAt": "2024-02-22T12:27:06Z",
      "content": "Si vous cliquez sur « Tout accepter », nos partenaires (y compris 241 qui font partie du Cadre de transparence et de consentement dIAB) et nous utiliserons également des témoins et vos données person… [+982 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Express News Service",
      "title": "Shah to inaugurate cricket premier league in his constituency",
      "description": "The cricket tournament has been organised with an objective of 'Khelo Gandhinagar' and the inauguration will take place at SGVP, Chharodi on the Sarkhej-Gandhinagar Highway in Ahmedabad.",
      "url": "https://indianexpress.com/article/cities/ahmedabad/amit-shah-inaugurates-night-cricket-tournament-gandhinagar-premier-league-bhupendra-patel-hardik-pandya-9156412/",
      "urlToImage": "https://images.indianexpress.com/2024/02/amit-shaaah.jpg",
      "publishedAt": "2024-02-11T19:30:39Z",
      "content": "Union Home Minister Amit Shah will on Monday inaugurate Gandhinagar Lok Sabha Premier League, a cricket tournament for the people of his Gandhinagar Lok Sabha constituency, an official release from t… [+738 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Trends Desk",
      "title": "’31 years of married life’: Pak cricket expert defends himself after he attempts to hit wife during YouTube live",
      "description": "The viral video shows an anchor, Rizwan Haider, speaking to Pakistani cricket expert Mohsin Ali.",
      "url": "https://indianexpress.com/article/trending/trending-globally/pakistani-cricket-expert-defends-himself-after-he-attempts-to-hit-wife-during-youtube-live-9168036/",
      "urlToImage": "https://images.indianexpress.com/2024/02/wowo-5.jpg",
      "publishedAt": "2024-02-18T12:59:03Z",
      "content": "Social media has vast possibilities. The digital age has triggered a whole new space for professionals to interact with each other by going live. While most times when celebrities and creators keep t… [+1424 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "India win toss & bat against England in third Test",
      "description": "Follow live text updates from day one of the third Test between India and England in Rajkot.",
      "url": "https://www.bbc.co.uk/sport/live/cricket/67781224",
      "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.23.3/images/bbc-sport-logo.png",
      "publishedAt": "2024-02-14T15:12:07Z",
      "content": "After 10 long days without it, the cricket is back. \r\nIndia and England are ready to leap from their chairs for round three of this fascinating contest.\r\nThe series has moved on to the Gujarat city o… [+131 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Stereogum"
      },
      "author": "Danielle Chelosky",
      "title": "Taylor Swift Plays “You’re Losing Me” Live For The First Time, Donates $100K To Family Of Radio DJ Killed In Chiefs Parade Shooting",
      "description": "On Friday, Taylor Swift played her first Australian Eras Tour show at Melbourne Cricket Ground. The set’s surprise songs were “Red” and, for the first time “You’re Losing Me,” a bonus track from her Album Of The Year Grammy-winning Midnights.",
      "url": "https://www.stereogum.com/2252324/taylor-swift-plays-youre-losing-me-live-for-the-first-time-donates-100k-to-family-of-radio-dj-killed-in-chiefs-parade-shooting/news/",
      "urlToImage": "https://static.stereogum.com/uploads/2024/02/Screenshot-2024-02-17-at-1.10.32-PM-1708193442.png",
      "publishedAt": "2024-02-17T18:48:18Z",
      "content": "On Friday, Taylor Swift played her first Australian Eras Tour show at Melbourne Cricket Ground. The set’s surprise songs were “Red” and, for the first time “You’re Losing Me,” a bonus track from her … [+1570 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Scimex.org"
      },
      "author": "",
      "title": "Researchers have developed a beef-rice hybrid",
      "description": "You've heard of lab grown meat, are you ready for rice-grown beef?\n\t\t\t\t\n\t\t\tInternational researchers have developed a beef-rice hybrid they say could be a protein-rich food of the future. The team says they took muscle and fat stem cells from cows, and transp…",
      "url": "https://www.scimex.org/newsfeed/youve-heard-of-lab-grown-meat-are-you-ready-for-rice-grown-beef",
      "urlToImage": "https://www.scimex.org/__data/assets/image/0012/964848/beef-rice_Growing-animal-muscle-and-fat-cells-inside-rice-grains-1-CREDIT-Yonsei-University.jpeg",
      "publishedAt": "2024-02-14T22:46:08Z",
      "content": "From: Cell Press\r\nBy growing animal cells in rice grains, scientists dish up hybrid food\r\nFrom lab-grown chicken to cricket-derived protein, these innovative alternatives offer hope for a planet stru… [+3834 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Ashwin out of third Test over family emergency",
      "description": "India spinner Ravichandran Ashwin pulls out of the third Test against England in Rajkot because of a family emergency.",
      "url": "https://www.bbc.co.uk/sport/cricket/68303676",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/11787/production/_124395517_bbcbreakingnewsgraphic.jpg",
      "publishedAt": "2024-02-16T17:32:58Z",
      "content": "India off-spinner Ravichandran Ashwin has pulled out of the third Test against England in Rajkot because of a family emergency.\r\nOn Friday's second day, the 37-year-old became only the ninth man to r… [+263 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Devendra Pandey",
      "title": "Mumbai Cricket Association announces courses in anti-corruption, umpiring and much more; here’s all you need to know",
      "description": "The Mumbai Cricket Association also informed that the candidates will be hired as interns during their summer vacation camps.",
      "url": "https://indianexpress.com/article/cities/mumbai/mumbai-cricket-association-announces-courses-anti-corruption-umpiring-9188307/",
      "urlToImage": "https://images.indianexpress.com/2024/02/Untitled-2024-02-29T170223.988.jpeg",
      "publishedAt": "2024-02-29T11:36:11Z",
      "content": "The Mumbai Cricket Association (MCA) will launch its new programme called the MCA Knowledge Centre to educate and train candidates for development of cricketing support staff in the city, officials s… [+1400 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Touch Arcade"
      },
      "author": "Shaun Musgrave",
      "title": "SwitchArcade Round-Up: ‘Ufouria 2: The Saga’, ‘Cricket Through the Ages’, Plus More Releases and Sales",
      "description": "Hello gentle readers, and welcome to the SwitchArcade Round-Up for March 1st, 2024. In today's article, we're looking at the remaining releases of the week. There are a few really good ones today, but the bin bunch certainly isn't going home hungry.",
      "url": "https://toucharcade.com/2024/03/01/ufouria-2-the-saga-sunsoft-download-switch-eshop-cricket-through-the-ages-apple-arcade-humble-bundle-game-sale-nintendo/",
      "urlToImage": null,
      "publishedAt": "2024-03-01T23:46:46Z",
      "content": "Hello gentle readers, and welcome to the SwitchArcade Round-Up for March 1st, 2024. In today’s article, we’re looking at the remaining releases of the week. There are a few really good ones today, bu… [+6073 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Sports Desk",
      "title": "Ireland vs Afghanistan in UAE: Series schedule, squads, venues, live streaming details",
      "description": "Ireland vs Afghanistan in 2024: Here is a look at the squads, live streaming info, schedule and all you need to ahead of the multi-format series between the teams in UAE.",
      "url": "https://indianexpress.com/article/sports/cricket/ireland-vs-afghanistan-uae-series-schedule-squads-venues-live-streaming-details-9183695/",
      "urlToImage": "https://images.indianexpress.com/2024/02/New-Project-15.jpg",
      "publishedAt": "2024-02-27T09:25:33Z",
      "content": "Ireland and Afghanistan will meet for a multi-format bilateral series in the United Arab Emirates starting with a one-off Test in Abu Dhabi on Wednesday. The solitary Test will be played at the Sheik… [+2117 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Trends Desk",
      "title": "Sachin Tendulkar flies economy class, passengers chant his name. Watch",
      "description": "The video shows thrilled passengers as they see Sachin Tendulkar on the same flight.",
      "url": "https://indianexpress.com/article/trending/trending-in-india/sachin-tendulkar-flies-economy-class-passengers-chant-his-name-watch-9173274/",
      "urlToImage": "https://images.indianexpress.com/2024/02/Chor-by-Justh-9-1.jpg",
      "publishedAt": "2024-02-21T12:01:44Z",
      "content": "A video of Indian cricket legend Sachin Tendulkar flying in the economy class in an IndiGo flight has taken the internet by storm. The video shows the thrilled passengers as they see Tendulkar on the… [+1601 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Entertainment Desk",
      "title": "Sohail Khan says he wants son Nirvan to assist ‘Ajay Devgn, Akshay Kumar, Pankaj Tripathi’, reveals Salman Khan was a good left-arm bowler",
      "description": "Sohail Khan, who is a part of the 10th season of Celebrity Cricket League, takes a trip down memory lane when his brother Salman was the biggest sportsperson in the house, discussing films overshadowing his love for the sport.",
      "url": "https://indianexpress.com/article/entertainment/bollywood/sohail-khan-says-he-wants-son-nirvan-to-assist-ajay-devgn-akshay-kumar-pankaj-tripathi-reveals-salman-khan-was-a-good-left-arm-bowler-9172777/",
      "urlToImage": "https://images.indianexpress.com/2024/02/Salman-Khan-edited.jpg",
      "publishedAt": "2024-02-21T08:59:18Z",
      "content": "In India, cricket and Bollywood are more than just forms of entertainment and often play significant roles in the cultural fabric of the country. The two cultural phenomena are often intertwined. The… [+2595 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Sports Desk",
      "title": "England will not win the series if they bat the way they did in Visakhapatnam: Michael Vaughan",
      "description": "Former captain says England's batting unit need to fine a balance between playing aggressive and traditional cricket to succeed in India.",
      "url": "https://indianexpress.com/article/sports/cricket/england-will-not-win-the-series-if-they-bat-the-way-they-did-in-visakhapatnam-michael-vaughan-9152719/",
      "urlToImage": "https://images.indianexpress.com/2024/02/Ben-Stokes.jpg",
      "publishedAt": "2024-02-09T07:44:10Z",
      "content": "Making a scathing attack on Ben Stokes-led England cricket team, former captain Michael Vaughan said the visitors will not be able to win the series, if they would continue to bat the way they batted… [+1632 chars]"
    },
    {
      "source": {
        "id": "al-jazeera-english",
        "name": "Al Jazeera English"
      },
      "author": "Kevin Hand",
      "title": "India can cope with Kohli’s loss but ‘phenomenal’ England need Test runs",
      "description": "India face England in the third Test in Rajkot on Thursday with the five-match series level at 1-1.",
      "url": "https://www.aljazeera.com/sports/2024/2/13/india-can-cope-with-kohlis-loss-as-phenomenal-england-must-find-runs",
      "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2024/02/2024-01-03T132901Z_895895914_UP1EK1311GB2M_RTRMADP_3_CRICKET-TEST-ZAF-IND-1-1707825028.jpg?resize=1920%2C1357",
      "publishedAt": "2024-02-13T12:42:22Z",
      "content": "India face England in the third Test on Thursday looking to restore some normality and authority to their five-game series but they will do so knowing that Virat Kohli is now available for the remain… [+5624 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Forbes"
      },
      "author": "Tristan Lavalette, Contributor, \n Tristan Lavalette, Contributor\n https://www.forbes.com/sites/tristanlavalette/",
      "title": "England’s Aggressive Approach To Test Cricket Under Scrutiny",
      "description": "England's mantra of playing ultra-aggressive in five-day Test cricket was always going to have its reckoning in India.",
      "url": "https://www.forbes.com/sites/tristanlavalette/2024/02/21/englands-aggressive-approach-to-test-cricket-under-scrutiny/",
      "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/65d56839e02d960e7e721f09/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      "publishedAt": "2024-02-21T11:56:27Z",
      "content": "England captain Ben Stokes had had a terrific record until losing the last two Tests (Photo by ... [+] Gareth Copley/Getty Images)\r\nGetty Images\r\nIn the toughest terrain in cricket, amid the hardest … [+3714 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "GSMArena.com"
      },
      "author": "Yordan",
      "title": "Reliance and Disney join forces on $8.5 billion media giant",
      "description": "Reliance, India's top conglomerate, and The Walt Disney Company, one of the world's leading entertainment companies, announced a major partnership in India.\n\nThe deal will merge the Reliance and Disney streaming and media assets, creating an $8.5 billion ente…",
      "url": "https://www.gsmarena.com/reliance_disney_joint_venture_media_giant-news-61805.php",
      "urlToImage": "https://fdn.gsmarena.com/imgroot/news/21/03/disney-plus-100m-subscribers/-952x498w6/gsmarena_000.jpg",
      "publishedAt": "2024-02-29T13:23:01Z",
      "content": "Reliance, India's top conglomerate, and The Walt Disney Company, one of the world's leading entertainment companies, announced a major partnership in India.\r\nThe deal will merge the Reliance and Disn… [+1583 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Sports Desk",
      "title": "IND vs AUS Live Streaming, U19 World Cup 2024: When and where to watch India vs Australia final?",
      "description": "India vs Australia Live Streaming, U19 World Cup 2024:  Five time champions India led by Uday Saharan will take on three times champion led by Hugh Weibgen in the 2024 U19 World Cup at Willowmoore Park, Benoni",
      "url": "https://indianexpress.com/article/sports/cricket/ind-vs-aus-live-streaming-u19-world-cup-2024-final-from-willowmoore-park-benoni-date-9154251/",
      "urlToImage": "https://images.indianexpress.com/2024/02/icc-under-19-world-cup.jpg",
      "publishedAt": "2024-02-10T05:50:02Z",
      "content": "IND vs AUS Live Streaming, ICC U19 Word Cup 2024: India will take on Australia in the ICC Under 19 World Cup 2024 at Willowmoore Park in Benoni. Both teams are coming back off thrilling semifinal win… [+1101 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Irish secure first Test with with Afghanistan victory",
      "description": "Ireland earn a first men's Test victory at the eighth attempt after beating Afghanistan by six wickets in Abu Dhabi.",
      "url": "https://www.bbc.co.uk/sport/cricket/68446580",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/11787/production/_124395517_bbcbreakingnewsgraphic.jpg",
      "publishedAt": "2024-03-01T12:39:52Z",
      "content": "<table>\r\n<tr><td>One-off Test, Tolerance Oval, Abu Dhabi, UAE (Day 3 of 5)</td></tr><tr><td>Afghanistan 155 I Zadran 53; Adair 5-39 &amp; 218 Hashmatullah 55; Young 3-24</td></tr><tr><td>Ireland 263 … [+632 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Phys.Org"
      },
      "author": "Science X",
      "title": "By growing animal cells in rice grains, scientists dish up hybrid food",
      "description": "From lab-grown chicken to cricket-derived protein, these innovative alternatives offer hope for a planet struggling with the environmental and ethical impacts of industrial agriculture. Now, Korean scientists add a new recipe to the list—cultured beef rice—by…",
      "url": "https://phys.org/news/2024-02-animal-cells-rice-grains-scientists.html",
      "urlToImage": "https://scx2.b-cdn.net/gfx/news/hires/2024/by-growing-animal-cell.jpg",
      "publishedAt": "2024-02-14T16:00:01Z",
      "content": "From lab-grown chicken to cricket-derived protein, these innovative alternatives offer hope for a planet struggling with the environmental and ethical impacts of industrial agriculture. Now, Korean s… [+3822 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "England cling to India despite Jaiswal century",
      "description": "England admirably cling on to India, despite Yashasvi Jaiswal making a sublime century on the opening day of the second Test in Visakhapatnam.",
      "url": "https://www.bbc.co.uk/sport/cricket/68171306",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/13185/production/_132531287_yashasvijaiswal.jpg",
      "publishedAt": "2024-02-02T11:10:03Z",
      "content": "Yashasvi Jaiswal went to his second Test hundred by hitting Tom Hartley for six\r\n<table>\r\n<tr><td>Second Test, Visakhapatnam (day one of five):</td></tr><tr><td>India 336-6: (Jaiswal 179*; Ahmed 2-61… [+5034 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Forbes"
      },
      "author": "Tristan Lavalette, Contributor, \n Tristan Lavalette, Contributor\n https://www.forbes.com/sites/tristanlavalette/",
      "title": "The Money-Spinning Indian Premier League Ready To Again Stop Cricket’s Calendar",
      "description": "The Indian Premier League lures the world's best players with big contracts and causes a pause annually in cricket's international calendar for two months.",
      "url": "https://www.forbes.com/sites/tristanlavalette/2024/02/25/the-money-spinning-indian-premier-league-ready-to-again-stop-crickets-calendar/",
      "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/65da8d14d5c8896c2848095e/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      "publishedAt": "2024-02-25T12:44:21Z",
      "content": "Money-spinning Indian Premier League ready to again stop cricket's calendar (Photo by Pankaj ... [+] Nangia/Getty Images)\r\nGetty Images\r\nAs the calendar flips into March, cricket in Australia starts … [+3759 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Forbes"
      },
      "author": "Tristan Lavalette, Contributor, \n Tristan Lavalette, Contributor\n https://www.forbes.com/sites/tristanlavalette/",
      "title": "Lack Of Matches Between Australia-New Zealand Underlines Test Cricket’s Problems",
      "description": "More effort is needed reviving Test cricket beyond the sport's power countries who can afford to play the expensive format while many others can't",
      "url": "https://www.forbes.com/sites/tristanlavalette/2024/02/29/lack-of-matches-between-australia-new-zealand-underlines-test-crickets-problems/",
      "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/65dffd6e333543abad7eb2ff/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      "publishedAt": "2024-02-29T10:20:20Z",
      "content": "New Zealand and Australia will play a rare Test match against each other (Photo by Hagen ... [+] Hopkins/Getty Images)\r\nGetty Images\r\nA flight from Sydney to Auckland is only three hours. That's cons… [+3697 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "India rest bowler Bumrah for fourth England Test",
      "description": "India rest pace bowler Jasprit Bumrah for the fourth Test against England in Ranchi, starting on Thursday.",
      "url": "https://www.bbc.co.uk/sport/cricket/68354606",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/E541/production/_132698685_gettyimages-2015188668-1.jpg",
      "publishedAt": "2024-02-20T19:59:49Z",
      "content": "Jasprit Bumrah (right) made his India Test debut against South Africa in 2018\r\n<table><tr><th>India v England, Fourth Test</th></tr>\r\n<tr><td>Venue: JSCA International Stadium Complex, Ranchi Dates: … [+1740 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Sports Desk",
      "title": "Akash Deep: From losing father brother to medical negligence, arranging oxygen cylinders for mother during Covid to making debut in Ranchi",
      "description": "Akash Deep has made an excellent Test debut on the opening Day of the Ranchi Test as he has removed Zak Crawley, Ben Duckett and Ollie Pope.",
      "url": "https://indianexpress.com/article/sports/cricket/ind-vs-eng-akash-deep-journey-test-debut-ranchi-9176688/",
      "urlToImage": "https://images.indianexpress.com/2024/02/Akash-Deep-2.jpg",
      "publishedAt": "2024-02-23T05:48:49Z",
      "content": "The Bengal pacer got his maiden wicket with England opener Zak Crawley’s off-stump went for a cartwheel, but he had overstepped. However, the agony turned into a delight after he found the outside ed… [+3401 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Venkata Krishna B",
      "title": "How Hardik Pandya managed to get a Grade A BCCI central contract",
      "description": "Even as Shreyas Iyer and Ishan Kishan missed out, all-rounder says if not busy with India commitments, he will play Syed Mushtaq Ali T20s and Vijay Hazare Trophy.",
      "url": "https://indianexpress.com/article/sports/cricket/hardik-pandya-promises-to-play-domestic-white-ball-cricket-to-salvage-bcci-central-contract-9188775/",
      "urlToImage": "https://images.indianexpress.com/2024/02/Pandya-14.jpg",
      "publishedAt": "2024-02-29T14:28:45Z",
      "content": "Even as the decision to omit Shreyas Iyer and Ishan Kishan from the central contracts list for not turning up for domestic tournaments continues to receive mixed reactions, there was plenty of discus… [+3520 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Rolling Stone"
      },
      "author": "Kyle Lamar Rice",
      "title": "How to Stream ‘The Color Purple’ Online",
      "description": "Blitz Bazawule's rendition of 'The Color Purple' has become a \"sacred healing work\" that everyone should watch. Here's how to stream the new film",
      "url": "http://www.rollingstone.com/product-recommendations/lifestyle/how-to-stream-the-color-purple-1234969519/",
      "urlToImage": "https://www.rollingstone.com/wp-content/uploads/2023/12/MCDCOPU_WB010.jpg?w=1600&h=900&crop=1",
      "publishedAt": "2024-02-16T22:34:05Z",
      "content": "If you purchase an independently reviewed product or service through a link on our website, Rolling Stone may receive an affiliate commission.\r\nQuick Answer: The Color Purple (2023) can currently be … [+4478 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Forbes"
      },
      "author": "Tristan Lavalette, Contributor, \n Tristan Lavalette, Contributor\n https://www.forbes.com/sites/tristanlavalette/",
      "title": "Legendary Ricky Ponting Joins America’s Major League Cricket After Its Financially Successful Debut",
      "description": "Ricky Ponting will coach Washington Freedom in a two-year deal that adds heft to the lucrative MLC, which lured a number of star international cricketers in its launch.",
      "url": "https://www.forbes.com/sites/tristanlavalette/2024/02/08/legendary-ricky-ponting-joins-major-league-cricket-after-its-financially-successful-debut/",
      "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/65c414515a1bbdc6fffdc945/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      "publishedAt": "2024-02-08T09:10:03Z",
      "content": "Ricky Ponting will be coach of the Washington franchise in Major League Cricket (Photo by Matt ... [+] Roberts-ICC/ICC via Getty Images)\r\nICC via Getty Images\r\nMajor League Cricket, having surpassed … [+3875 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Sky Sports"
      },
      "author": null,
      "title": "Ceferin won't run for UEFA presidency in 2027",
      "description": "UEFA president Aleksander Ceferin says he will not run for re-election in 2027.",
      "url": "https://www.skysports.com/football/news/11095/13066754/aleksander-ceferin-will-not-run-for-uefa-presidency-in-2027",
      "urlToImage": "https://e0.365dm.com/21/09/1600x900/skysports-football-aleksander-ceferin_5506363.jpg?20210909164757",
      "publishedAt": "2024-02-08T12:16:00Z",
      "content": "UEFA president Aleksander Ceferin says he will not run for re-election in 2027.\r\nMore to follow…\r\nThis is a breaking news story that is being updated and more details will be published shortly. Pleas… [+733 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "HYPEBEAST"
      },
      "author": "info@hypebeast.com (Hypebeast)",
      "title": "Everything Coming To Disney+ in March 2024",
      "description": "As we enter the final week of February, Disney+ unveiled its slate of new programming for March 2024.Next month's list is led by the premiere of X-Men '97, the revival of the '90s animated X-Men series. Also hitting the streamer next month is Taylor Swift's T…",
      "url": "https://hypebeast.com/2024/2/new-disney-plus-movies-films-tv-shows-march-2024",
      "urlToImage": "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2024%2F02%2Fnew-disney-plus-movies-films-tv-shows-march-2024-tw.jpg?w=1080&cbr=1&q=90&fit=max",
      "publishedAt": "2024-02-26T07:32:43Z",
      "content": "As we enter the final week of February, Disney+ unveiled its slate of new programming for March 2024.Next month’s list is led by the premiere of X-Men ‘97, the revival of the ’90s animated X-Men seri… [+5090 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Forbes"
      },
      "author": "Tim Ellis, Contributor, \n Tim Ellis, Contributor\n https://www.forbes.com/sites/timellis/",
      "title": "Ben Stokes Cuts His Rough Diamond Into Shape For The 100th Test",
      "description": "Ben Stokes has been playing Test cricket for a decade. His rough patches have made him into a better player and captain.",
      "url": "https://www.forbes.com/sites/timellis/2024/02/14/ben-stokes-cuts-his-rough-diamond-into-shape-for-the-100th-test/",
      "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/65cd4ec85552832881fab769/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      "publishedAt": "2024-02-15T00:31:38Z",
      "content": "PERTH, AUSTRALIA - DECEMBER 17: Ben Stokes of England celebrates after reaching his century during ... [+] day five of the Third Ashes Test Match between Australia and England at WACA on December 17,… [+4612 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Xataka Android"
      },
      "author": "Iván Ramírez",
      "title": "Lo último de Asistente de Google es esperar por ti a que te responda una persona al llamar a una línea de atención al cliente",
      "description": "Search Labs, el apartado experimental dentro de la aplicación de Google, tiene un nuevo experimento disponible: Talk to a live representative o, en lenguaje plano \"que se ponga un humano\". Es en esencia un servicio por el cual el Asistente de Google espera se…",
      "url": "https://www.xatakandroid.com/aplicaciones-android/ultimo-asistente-google-esperar-ti-a-que-te-responda-persona-al-llamar-a-linea-atencion-al-cliente",
      "urlToImage": "https://i.blogs.es/c33bdc/habla/840_560.jpeg",
      "publishedAt": "2024-02-16T07:01:25Z",
      "content": "Search Labs, el apartado experimental dentro de la aplicación de Google, tiene un nuevo experimento disponible: Talk to a live representative o, en lenguaje plano \"que se ponga un humano\". Es en esen… [+2397 chars]"
    },
    {
      "source": {
        "id": "the-times-of-india",
        "name": "The Times of India"
      },
      "author": "PTI",
      "title": "Imran Khan's PTI party to be invited by President Alvi to form govt claims Gohar Khan",
      "description": "Imran Khan, 71, a cricketer-turned-politician and the founding chairman of the PTI, is behind bars and barred from contesting. PTI candidates are running as independents after they were not allowed to use the party symbol - a cricket 'bat'.",
      "url": "https://economictimes.indiatimes.com/news/international/world-news/imran-khans-pti-party-to-be-invited-by-president-alvi-to-form-govt-claims-gohar-khan/articleshow/107589214.cms",
      "urlToImage": "https://img.etimg.com/thumb/msid-107589642,width-1200,height-630,imgsize-35940,overlay-economictimes/photo.jpg",
      "publishedAt": "2024-02-10T18:05:23Z",
      "content": "Pakistan Tehreek-e-Insaf Chairman Barrister Gohar Ali Khan on Saturday claimed that President Arif Alvi would invite his party to form the government as they had secured a majority in the National As… [+2801 chars]"
    },
    {
      "source": {
        "id": "al-jazeera-english",
        "name": "Al Jazeera English"
      },
      "author": "Abid Hussain",
      "title": "As early results come in, could Pakistan election spring a surprise?",
      "description": "As I reported from across Lahore on election day, one thing became clear: It's a closer contest than many had predicted.",
      "url": "https://www.aljazeera.com/features/2024/2/9/as-early-results-come-in-could-pakistan-election-spring-a-surprise",
      "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2024/02/PXL_20240208_082542237-1707452859.jpg?resize=1200%2C675",
      "publishedAt": "2024-02-09T07:20:04Z",
      "content": "Lahore, Pakistan: When I stepped out on a cool Thursday morning to cover Pakistans 12th general election, there was an air of inevitability about the whole exercise.\r\nMost respectable analysts had al… [+9166 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Forbes"
      },
      "author": "Tristan Lavalette, Contributor, \n Tristan Lavalette, Contributor\n https://www.forbes.com/sites/tristanlavalette/",
      "title": "New York’s India-Pakistan Cricket Match Will Be The Hottest Ticket As Prices Announced",
      "description": "It is almost certain that the India-Pakistan blockbuster in New York will be a sell-out in a clear indication that it is the hottest ticket of the T20 World Cup.",
      "url": "https://www.forbes.com/sites/tristanlavalette/2024/02/04/new-yorks-india-pakistan-cricket-match-will-be-the-hottest-ticket-as-prices-announced/",
      "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/6584bf6cbc16f3faff89c11c/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      "publishedAt": "2024-02-04T07:03:52Z",
      "content": "India and Pakistan is the most anticipated match in cricket (Photo by Daniel Pockett-ICC/ICC via ... [+] Getty Images)\r\nICC via Getty Images\r\nIn just four months, the U.S. will be the focus of the cr… [+3336 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Sky Sports"
      },
      "author": null,
      "title": "Pogba given four-year ban for doping offence",
      "description": "Juventus midfielder Paul Pogba has been given a four-year anti-doping ban after the World Cup winner tested positive for testosterone, reports Sky in Italy",
      "url": "https://www.skysports.com/football/news/11095/13083650/paul-pogba-juventus-midfielder-banned-for-four-years-after-world-cup-winner-tested-positive-for-testosterone",
      "urlToImage": "https://e0.365dm.com/23/09/1600x900/skysports-paul-pogba-juventus_6281590.jpg?20230912064112",
      "publishedAt": "2024-02-29T11:49:00Z",
      "content": "Juventus midfielder Paul Pogba has been given a four-year anti-doping ban after the World Cup winner tested positive for testosterone, reports Sky in Italy\r\nMore to follow....\r\nThis is a breaking new… [+812 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "'Botham and Brearley rolled into one - enjoy Stokes while you can'",
      "description": "Ben Stokes' journey to 100 Tests has been one of the most compelling stories in British sport, writes Stephan Shemilt.",
      "url": "https://www.bbc.co.uk/sport/cricket/68287805",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/0F35/production/_132639830_ben_stokes_getty3.jpg",
      "publishedAt": "2024-02-14T13:22:23Z",
      "content": "Ben Stokes will become the 16th man to reach 100 Tests for England\r\nBen Stokes is right again. He doesn't get much wrong these days.\r\nThe England skipper will win his 100th cap in the third Test agai… [+5749 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Sandip G",
      "title": "Bazball parallels to football: Like Jurgen Klopp did, Brendon McCullum’s England play heavy metal cricket, it deserves its place in history",
      "description": "To attack is the soul of Bazball, as it was originally for Klopp-ball. In a way, it is as much about emotion as it is about intensity of purpose.",
      "url": "https://indianexpress.com/article/sports/football/bazball-parallels-to-football-like-jurgen-klopp-did-brendon-mccullums-england-play-heavy-metal-cricket-it-deserves-its-place-in-history-9168642/",
      "urlToImage": "https://images.indianexpress.com/2024/02/Jurgen-Klopp-and-Brendon-McCullum.jpg",
      "publishedAt": "2024-02-19T03:37:41Z",
      "content": "In cricket, eleven different men could play in eleven different ways and win a game in eleven different manners, unbound by a common playing theme, style or structure. Football, though played by elev… [+5401 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Deadline"
      },
      "author": "Caroline Frost",
      "title": "Taylor Swift “Starstruck” By Record-Breaking Melbourne Crowd; Announces New Song",
      "description": "Taylor Swift was left speechless by the largest crowd she’s fronted on her record-breaking tour when she took to the stage in Melbourne, Australia, on Friday evening. Almost 100,000 fans were in the crowd at the city’s famous cricket ground (the MCG) for her …",
      "url": "http://deadline.com/2024/02/taylor-swift-starstruck-by-record-breaking-melbourne-crowd-mcg-eras-tour-1235829157/",
      "urlToImage": "https://deadline.com/wp-content/uploads/2024/02/GettyImages-2014753830.jpg?w=1024",
      "publishedAt": "2024-02-17T10:28:31Z",
      "content": "Taylor Swift was left speechless by the largest crowd she’s fronted on her record-breaking tour when she took to the stage in Melbourne, Australia, on Friday evening.\r\nAlmost 100,000 fans were in the… [+1933 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Forbes"
      },
      "author": "Tristan Lavalette, Contributor, \n Tristan Lavalette, Contributor\n https://www.forbes.com/sites/tristanlavalette/",
      "title": "Rohit Sharma Backed to Help End Cricket Powerhouse India’s Title Drought",
      "description": "Rohit Sharma will lead India at the T20 World Cup as cricket's richest team look to end a 13-year title drought.",
      "url": "https://www.forbes.com/sites/tristanlavalette/2024/02/16/rohit-sharma-backed-to-help-end-cricket-powerhouse-indias-title-drought/",
      "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/65cd9379a311b96ec78b3a1d/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      "publishedAt": "2024-02-16T05:06:33Z",
      "content": "Rohit Sharma will lead India at the T20 World Cup (Photo by Mark Kolbe/Getty Images)\r\nGetty Images\r\nRohit Sharma looked dishevelled as he stared in the distance. The sombre sea of blue in the terrace… [+3084 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Flintoff's side to have first pick in Hundred draft",
      "description": "The Northern Superchargers men's team, whose head coach is Andrew Flintoff, will have first pick in this year's draft of The Hundred.",
      "url": "https://www.bbc.co.uk/sport/cricket/68433990",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/11E01/production/_132771237_gettyimages-1847546977.jpg",
      "publishedAt": "2024-02-29T10:43:44Z",
      "content": "Former captain Andrew Flintoff worked with England on an informal basis last year\r\nThe Northern Superchargers men's team, whose head coach is Andrew Flintoff, will have first pick in this year's draf… [+1000 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "TMZ"
      },
      "author": "TMZ Staff",
      "title": "Taylor Swift Fan Dies While Driving to Pop Star's Australia Concert",
      "description": "Another deadly tragedy has struck Taylor Swift's legion of avid fans – months after one of her concertgoers died in Brazil. The latest bad news came Thursday when a teenager was killed as she and her family were driving to the pop superstar's…",
      "url": "https://www.tmz.com/2024/02/17/taylor-swift-fan-dead-dies-driving-australia-concert-melbourne-eras/",
      "urlToImage": "https://imagez.tmz.com/image/eb/16by9/2024/02/17/eb6660dd1d1b4083b18105606bbe1917_xl.jpg",
      "publishedAt": "2024-02-17T15:17:43Z",
      "content": "Another deadly tragedy has struck Taylor Swift's legion of avid fans months after one of her concertgoers died in Brazil.\r\nThe latest bad news came Thursday when a teenager was killed as she and her … [+1738 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Sandeep Dwivedi",
      "title": "Yashasvi Jaiswal’s success a hat-tip to Mumbai, city with big heart and giving cricketers",
      "description": "The 11-year-old outsider from UP with raw talent was adopted by a system that still works on meritocracy unlike the erstwhile cricketing heavyweight Delhi.",
      "url": "https://indianexpress.com/article/sports/cricket/yashasvi-jaiswals-success-hat-tip-mumbai-big-heart-9177866/",
      "urlToImage": "https://images.indianexpress.com/2024/02/Yashasvi-jaiswal-SANDEEP-DWIVEDI-COLUMN.jpg",
      "publishedAt": "2024-02-24T03:02:31Z",
      "content": "Here’s a request. While applauding India’s bright new star Yashasvi Jaiswal’s runs and his technical correctness, do give a hat-tip to his city Mumbai that has dutifully conserved its cricketing heri… [+6122 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Londonist"
      },
      "author": "Will Noble",
      "title": "Cricket Cornish Pasty Anyone? London's Bug Restaurant Has Just Gone Permanent",
      "description": "There's cricket kofte with roasted peanut hummus, cricket Cornish pasty... even a cricket lasagne.",
      "url": "https://londonist.com/london/food-and-drink/yum-bug-restaurant-permanent",
      "urlToImage": "https://assets.londonist.com/uploads/2024/02/i875/yb_press-images_flatbread.jpg",
      "publishedAt": "2024-02-20T12:20:42Z",
      "content": "Waiter, waiter, there's a load of crickets on my flatbread...\r\nIn October 2023, a pop-up restaurant serving dishes like cricket-topped hummus, well, sprung up. It proved so popular, it's now gone per… [+1171 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Journal du geek"
      },
      "author": "Arthur Nicolle",
      "title": "L’atterisage sur la Lune a été détroné par la finale du Super Bowl",
      "description": "Cette année, le fameux tournoi de football américain a fini par dépasser un moment historique en termes d'audience.",
      "url": "https://www.journaldugeek.com/2024/02/14/latterisage-sur-la-lune-a-ete-detrone-par-la-finale-du-super-bowl/",
      "urlToImage": "https://www.journaldugeek.com/app/uploads/2024/02/super-bowl-2024-audiences-lune-atterissage.jpg",
      "publishedAt": "2024-02-14T07:34:05Z",
      "content": "Pour la première fois dans l’histoire de la télévision américaine, l’alunissage de la mission Apollo 11 n’est plus l’émission la plus regardée à l’échelle nationale. Toujours plus populaire que jamai… [+2705 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Forbes"
      },
      "author": "Tristan Lavalette, Contributor, \n Tristan Lavalette, Contributor\n https://www.forbes.com/sites/tristanlavalette/",
      "title": "The Hardest Task In All Of Sport Is Winning A Test Cricket Series In India",
      "description": "Having not lost since 2012, India are almost unbeatable at home in Tests as they showed with a gritty victory over England to underline the difficulty opponents face.",
      "url": "https://www.forbes.com/sites/tristanlavalette/2024/02/28/winning-test-cricket-in-india-is-the-hardest-task-in-all-of-sport/",
      "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/65deae4aa027b3217474fc36/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      "publishedAt": "2024-02-28T13:16:34Z",
      "content": "Shubman Gill (r) and Dhruv Jurel celebrate India's fourth Test victory (Photo by Gareth Copley/Getty ... [+] Images)\r\nGetty Images\r\nWith 20-year-old spinner Shoaib Bashir proving a mighty handful, co… [+4215 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "India's Kohli to miss rest of England Test series",
      "description": "India batter Virat Kohli will miss the rest of the Test series against England for personal reasons.",
      "url": "https://www.bbc.co.uk/sport/cricket/68234342",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/1725B/production/_132611849_gettyimages-1761632661.jpg",
      "publishedAt": "2024-02-10T06:23:23Z",
      "content": "Kohli has played 113 Tests for India, scoring almost 9,000 runs\r\nIndia batter Virat Kohli will miss the rest of the Test series against England for personal reasons.\r\nThe 35-year-old ex-captain previ… [+1064 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Australia's Green scores century to repel Kiwis",
      "description": "Australia all-rounder Cameron Green scores a century as he produces his side's main resistance on the opening day of the first Test in New Zealand.",
      "url": "https://www.bbc.co.uk/sport/cricket/68433022",
      "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/18A3/production/_132770360_gettyimages-2047134252.jpg",
      "publishedAt": "2024-02-29T09:38:39Z",
      "content": "Cameron Green's century at the Basin Reserve included 16 fours\r\n<table>\r\n<tr><td>Test Series, Basin Reserve, Wellington (day one):</td></tr><tr><td>Australia 279-9: Green 103no; Henry 4-43</td></tr><… [+1177 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Sandip G",
      "title": "Joe Root returns to serene best, shedding Bazball pretenses and embracing good old grind of Test cricket",
      "description": "Until Joe Root, ridiculed and rebuked for his intemperance this series, seized control of the day, the match seemed another lost cause for England.",
      "url": "https://indianexpress.com/article/sports/cricket/joe-root-shedding-bazball-pretenses-embracing-grind-test-cricket-9177478/",
      "urlToImage": "https://images.indianexpress.com/2024/02/JOE-ROOT-VS-INDIA-AP.jpg",
      "publishedAt": "2024-02-23T13:40:07Z",
      "content": "The day that began with a debutant making his mark on the big stage ended with a 139-Test-old virtuoso batsman twisting the script of the game to his will. If Akash Deeps verve and maturity enthralle… [+5182 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Sriram Veera",
      "title": "Chin music maestro Neil Wagner retires, batsmen heave a sigh of relief",
      "description": "South Africa-born Wagner played 64 tests for New Zealand and will finish fifth on New Zealand’s list of all-time test wicket-takers with 260 at an average of 37.",
      "url": "https://indianexpress.com/article/sports/cricket/chin-music-maestro-neil-wagner-retires-batsmen-heave-a-sigh-of-relief-9183013/",
      "urlToImage": "https://images.indianexpress.com/2024/02/Neil-Wagner.jpg",
      "publishedAt": "2024-02-27T03:42:07Z",
      "content": "Neil Wagner will finally stop bowling his bouncers. Watching him spill his guts out, attempt to spill the batsmens guts out, was one of the most visceral cricket experiences in modern-day cricket. Th… [+5380 chars]"
    },
    {
      "source": {
        "id": "al-jazeera-english",
        "name": "Al Jazeera English"
      },
      "author": "Al Jazeera",
      "title": "Imran Khan: Run out?",
      "description": "With exclusive access, we look at events that led to Imran Khan and his party being sidelined in Pakistan's elections.",
      "url": "https://www.aljazeera.com/program/people-power/2024/2/9/imran-khan-run-out",
      "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2024/02/image-1707480787.jpg?resize=1920%2C1080&quality=80",
      "publishedAt": "2024-02-09T12:34:45Z",
      "content": "With exclusive access, we look at the events that led to Imran Khan and his party being sidelined in Pakistans elections.Its not a movement. Its more like a tsunami that will sweep the country. This … [+868 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "The Indian Express"
      },
      "author": "Express News Service",
      "title": "Kerala businessman extortion case: Gujarat ATS arrests associate of suspended cop",
      "description": "Rajendra Shah allegedly helped Taral Bhatt freeze over “600 bank accounts for gaining illegal financial benefits\", the police said.",
      "url": "https://indianexpress.com/article/cities/ahmedabad/kerala-businessman-extortion-case-gujarat-ats-arrests-associate-of-suspended-cop-9187587/",
      "urlToImage": "https://images.indianexpress.com/2024/02/taral-bhatt.jpg",
      "publishedAt": "2024-02-29T05:57:00Z",
      "content": "The accused was identified as Deep Rajendra Shah, who allegedly helped Bhatt freeze over 600 bank accounts for gaining illegal financial benefits, He also has a criminal history of various cases in A… [+1621 chars]"
    },
    {
      "source": {
        "id": "al-jazeera-english",
        "name": "Al Jazeera English"
      },
      "author": "Al Jazeera",
      "title": "Indian model Poonam Pandey fakes cervical cancer death, triggering a row",
      "description": "Poonam Pandey announces death on Instagram, inviting flurry of reports and obituaries. Next day, she says it was fake.",
      "url": "https://www.aljazeera.com/news/2024/2/4/indian-model-poonam-pandey-fakes-cervical-cancer-death-triggering-a-row",
      "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2024/02/AFP__20131214__Del6273703__v2001__HighRes__Irfw-1707044727.jpg?resize=1920%2C1440",
      "publishedAt": "2024-02-04T10:49:33Z",
      "content": "An Indian model has sparked an online backlash after revealing she had faked her death in an Instagram post as part of a cervical cancer awareness campaign.\r\nPoonam Pandey bravely fought the disease … [+2751 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Sky Sports"
      },
      "author": null,
      "title": "Spurs host Man City as Chelsea & Man Utd discover Women's FA Cup QF fate",
      "description": "Tottenham will host Manchester City in the quarter-finals of the Women's FA Cup, while last year's finalists Chelsea and Manchester United also discovered their fate.",
      "url": "https://www.skysports.com/football/news/11095/13070290/womens-fa-cup-quarter-final-draw-tottenham-host-man-city-chelsea-face-everton-man-utd-travel-to-brighton",
      "urlToImage": "https://e0.365dm.com/24/02/1600x900/skysports-womens-fa-cup-trophy_6453415.jpg?20240212182651",
      "publishedAt": "2024-02-12T19:32:00Z",
      "content": "Tottenham will host Manchester City in the quarter-finals of the Women's FA Cup, while reigning champions Chelsea travel to Everton.\r\nManchester United, last season's runners-up, face an away game ag… [+1324 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Sky Sports"
      },
      "author": null,
      "title": "Mbappe to leave PSG this summer",
      "description": "Kylian Mbappe will leave Paris Saint-Germain this summer.",
      "url": "https://www.skysports.com/football/news/11095/13072335/kylian-mbappe-to-leave-paris-saint-germain-this-summer",
      "urlToImage": "https://e0.365dm.com/24/02/1600x900/skysports-kylian-mbappe-psg_6445402.jpg?20240205154117",
      "publishedAt": "2024-02-15T16:41:00Z",
      "content": "Kylian Mbappe will leave Paris Saint-Germain this summer.\r\nMbappe, out of contract in the summer, has communicated his decision to the French champions.\r\nThe terms of the forward's exit are yet to be… [+1258 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Sky Sports"
      },
      "author": null,
      "title": "Williamson pulls out of England squad for Austria and Italy games",
      "description": "Leah Williamson has pulled out of the England Women squad for games against Austria and Italy later this month.",
      "url": "https://www.skysports.com/football/news/11095/13075179/leah-williamson-pulls-out-of-england-women-squad-and-replaced-by-millie-turner",
      "urlToImage": "https://e0.365dm.com/24/02/1600x900/skysports-leah-williamson-england-women_6453918.jpg?20240213100523",
      "publishedAt": "2024-02-18T18:00:00Z",
      "content": "Leah Williamson has pulled out of the England Women squad for games against Austria and Italy later this month.\r\nThe Arsenal defender suffered a hamstring strain which saw her miss Saturday's 3-1 win… [+1242 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Sky Sports"
      },
      "author": null,
      "title": "Germany legend Brehme dies aged 63",
      "description": "Andreas Brehme, scorer of the winning goal for Germany in the World Cup final in 1990, has died aged 63.",
      "url": "https://www.skysports.com/football/news/11095/13076012/andreas-brehme-germany-legend-and-world-cup-winner-dies-aged-63",
      "urlToImage": "https://e0.365dm.com/22/10/1600x900/skysports-breaking-news-story_5927130.jpg?20221010162109",
      "publishedAt": "2024-02-20T08:30:00Z",
      "content": "Andreas Brehme, scorer of the winning goal for Germany in the World Cup final in 1990, has died aged 63.\r\nBrehme was a Bundesliga winner with both Kaiserslautern and Bayern Munich and also won a Seri… [+880 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Theregister.com"
      },
      "author": "Simon Sharwood",
      "title": "Two of India's most prominent startup tech giants are in deep trouble",
      "description": "Paytm's bank has been locked out, edtech darling Byju's faces bankruptcy\nTwo of India's tech leaders, both of which have been widely hailed as exemplars of local entrepreneurialism, are in deep trouble.…",
      "url": "https://www.theregister.com/2024/02/05/india_paytm_byjus_in_trouble/",
      "urlToImage": "https://regmedia.co.uk/2020/03/25/india_on_off_switch.jpg",
      "publishedAt": "2024-02-05T04:19:52Z",
      "content": "Two of India's tech leaders, both of which have been widely hailed as exemplars of local entrepreneurialism, are in deep trouble.\r\nLet's start with Paytm, a payment service that accounts for over 45 … [+3676 chars]"
    }
  ]
  
  handleNextClick =async ()=>{
    if(!(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageLimit))){
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=3a11d96aee89457ab7b1172be3eb7df0&page=${this.state.page+1}&pagesize=${this.props.pageLimit}&q=${this.state.input}`
      let data = await fetch(url).then(async res=>{
        if (res.ok){
          let parsedData = await res.json()
          this.setState({articles:parsedData.articles, totalResults: parsedData.articles, page:this.state.page+1})
        }
        else {
          this.handleHide()  
          let index = this.state.page
          this.show._currentValue.start +=this.props.pageLimit
          this.show._currentValue.end += this.props.pageLimit
          this.setState({articles:this.articles.slice(this.show._currentValue.start, this.show._currentValue.end), totalResults:this.articles.length, page:this.state.page+1})
        }
      }).catch(err=>{
        this.handleHide()
        let index = this.state.page
        this.show._currentValue.start +=this.props.pageLimit
        this.show._currentValue.end += this.props.pageLimit
        this.setState({articles:this.articles.slice(this.show._currentValue.start, this.show._currentValue.end), totalResults:this.articles.length, page:this.state.page+1})
      })
}
  }

  handlePrevClick = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=3a11d96aee89457ab7b1172be3eb7df0&page=${this.state.page-1}&pagesize=${this.props.pageLimit}&q=${this.state.input}`
    let data = await fetch(url).then(async res=>{
                                if (res.ok){
                                  let parsedData = await res.json()
                                  this.setState({articles:parsedData.articles, totalResults: parsedData.articles, page:this.state.page-1})
                                  this.handleShow()
                                }
                                else { 
                                  this.handleHide()
                                  let index = this.state.page
                                  this.show._currentValue.start -=this.props.pageLimit
                                  this.show._currentValue.end -= this.props.pageLimit
                                  this.setState({articles:this.articles.slice(this.show._currentValue.start, this.show._currentValue.end), totalResults:this.articles.length, page:this.state.page-1})
                                  }
                              }).catch(err=>{
                                this.handleHide()
                                  let index = this.state.page
                                  this.show._currentValue.start -=this.props.pageLimit
                                  this.show._currentValue.end -= this.props.pageLimit
                                  this.setState({articles:this.articles.slice(this.show._currentValue.start, this.show._currentValue.end), totalResults:this.articles.length, page:this.state.page-1})
                              })
    }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=3a11d96aee89457ab7b1172be3eb7df0&page=${this.state.page}&pagesize=${this.props.pageLimit}&q=${this.state.input}`
    let data = await fetch(url).then(async res=>{
                                if (res.ok){
                                  this.handleShow()
                                  let parsedData = await res.json()
                                  this.setState({articles:parsedData.articles, totalResults: parsedData.articles})
                                  // console.log(parsedData)
                                }
                                else { 
                                  this.handleHide()
                                  // console.log(this.show._currentValue.start<=1 ? "Ho ra":'Nahi ho raha')
                                  this.setState({articles:this.articles.slice(this.show._currentValue.start, this.show._currentValue.end), totalResults:this.articles.length})
                                }
                              }).catch(err=>{
                                // this.handleHide()
                                this.setState({articles:this.articles.slice(this.show._currentValue.start, this.show._currentValue.end), totalResults:this.articles.length})
                              })
  }

  async componentDidUpdate(){
    // setTimeout(async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=3a11d96aee89457ab7b1172be3eb7df0&page=${this.state.page}&pagesize=${this.props.pageLimit}&q=${this.state.input}`
    let data = await fetch(url).then(async res=>{
                                if (res.ok){
                                  // console.log("Hey")
                                  this.handleShow()
                                  let parsedData = await res.json()
                                  this.setState({articles:parsedData.articles, totalResults: parsedData.articles})
                                  // console.log(parsedData)
                                }
                                else { 
                                  this.handleHide()
                                  this.setState({articles:this.articles.slice(this.show._currentValue.start, this.show._currentValue.end), totalResults:this.articles.length})
                                  return 0
                                }
                              }).catch(err=>{
                                this.handleHide()
                                this.setState({articles:this.articles.slice(this.show._currentValue.start, this.show._currentValue.end), totalResults:this.articles.length})
                              })
    // }, 1500);
  }
  render() {
      return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-grey">
              <div className="container-fluid">
                <Link className="navbar-brand h1" to="/">NewsMonkey</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{'visibility':this.state.showBar}}>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link active" to="/business">Business</Link></li>
                    <li className="nav-item"><Link className="nav-link active" to="/entertainment">Entertainment</Link></li>
                    <li className="nav-item"><Link className="nav-link active" to="/health">Health</Link></li>
                    <li className="nav-item"><Link className="nav-link active" to="/science">Science</Link></li>
                    <li className="nav-item"><Link className="nav-link active" to="/sports">Sports</Link></li>
                    <li className="nav-item"><Link className="nav-link active" to="/technology">Technology</Link></li>
                    {/* <Outlet /> */}
                  </ul>
                  <form className="d-flex" style={{'visibility':this.state.showBar}}>
                    <input className="form-control me-2" type="search" placeholder="Search daily news.." value={this.state.input} onChange = {this.handleSubmit}/>
                    {/* <button className="btn btn-outline-dark" type="submit">Search</button> */}
                  </form>
                </div>
              </div>
            </nav>
            <div className='appName'>
          <p style={{ 'fontSize':'46px'}}><span style={{"color":'#b23f45', 'fontSize':'50px'}}>NewsMonkey.com</span> Unpeeling Stories, One Banana at a Time! <span className="cursor">|</span></p>
        </div>
        <div className="space">
          {this.state.articles.map((element)=>{
            return <NewsItem key = {element.title} headlines = {element.title==null ? "Just got here something new!":element.title.slice(0, 55)} source = {!element.author ? "Unknown.":(element.author.length < 15 ? element.author:element.author.slice(0, 16)+'...')} img = {element.urlToImage === null?"newspaper.png":element.urlToImage} link={element.url} author = {element.author} /> //headlines, source, img
          })}
          <div className="buttons">
            <button disabled={this.state.page<=1} onClick={this.handlePrevClick}>&larr;Prev</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageLimit)} onClick = {this.handleNextClick}>Next&rarr;</button>
          </div>
        </div>
        </>
      )
}
}