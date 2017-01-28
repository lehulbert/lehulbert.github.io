
// get the data


var nodes; var force;var svg; var path;



function buildGraph(){



  // instantiate d3plus
   // instantiate d3plus
  var visualization = d3plus.viz()
    .container("#chart2")     // container DIV to hold the visualization
    .data(words)     // data to use with the visualization
    .type("bubbles")       // visualization type
    .id(["product","word"])
    .depth(1)              // 0-based depth
    .size("tfidf")         // key name to size bubbles
    .color("asin")        // color by each group
    .draw()

  //var name = links[0].asin; var NewScore = 4.5;
  //var OldScore = 3.5;
  //document.getElementById("Name").innerHTML=name;
  //document.getElementById("NewScore").innerHTML=NewScore;
  //document.getElementById("OldScore").innerHTML=OldScore;
  //document.getElementById("Change").innerHTML=Math.round((NewScore-OldScore)/OldScore*100)

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.reviewerID] ||
  (nodes[link.reviewerID] = {name: link.reviewerID});
  link.target = nodes[link.asin] ||
  (nodes[link.asin] = {name: link.asin});
});

var width = 500,
height = 500,
color = d3.scale.category20c();


force = d3.layout.force()
.nodes(d3.values(nodes))
.links(links)
.size([width, height])
.linkDistance(60)
.charge(-300)
.on("tick", tick)
.start();



var  v = d3.scale.linear().range([0, 100]);

// Scale the range of the data
v.domain([0, d3.max(links, function(d) { return d.value; })]);


svg = d3.select("#chart1").append("svg")
.attr("width", width)
.attr("height", height);

svg.append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .style("stroke", "#000")
    .style("fill","none");
// build the arrow.
svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
  .attr("id", String)
  .attr("viewBox", "0 -5 10 10")
  .attr("refX", 15)
  .attr("refY", -1.5)
  .attr("markerWidth", 5)
  .attr("markerHeight", 5)
  .attr("orient", "auto")
  .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

//align center
var div = d3.select("#chart1")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

d3.select("#chart1").attr("align","center")
// add the links and the arrows
path = svg.append("svg:g").selectAll("path")
.data(force.links())
.enter().append("svg:path")
.style("stroke", "black")
.attr("fill", "none")
.attr("class", "link")
.style('marker-mid', "url(#end)")
.on("mouseover", function(d) {
            // console.log(d);
            div.style("opacity", .9);
            div.text("Rating: "+d.overall+"   " +"Sentiment: "+d.sentiment)
               .style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
        })
    .on("mouseout", function(d) {
            div.style("opacity", 0);
        });
// define the nodes
node = svg.selectAll(".node")
.data(force.nodes())
.enter().append("g")
.attr("class", "node")
.call(force.drag);
// add the nodes
node.append("circle")
.attr("r", function(d){
  return 10;
})
    .on("click", function(d,i){
        d.fixed = true;
        d3.select(this).style("fill", "magenta");
    })
    .on("dblclick",function(d,i){
         d.fixed = false;
         d3.select(this).style("fill", "#ccc");
    });



var labels = node.append("text")
.text(function(d) { return d.name; });

function click(d,i){
  d.fixed = true;
}
// add the curvy lines
function tick() {
  path.attr("d", function(d) {
    var dx = d.target.x - d.source.x,
    dy = d.target.y - d.source.y,
    dr = Math.sqrt(dx * dx + dy * dy);
    return "M" +
    d.source.x + "," +
    d.source.y + "A" +
    dr + "," + dr + " 0 0,1 " +
    d.target.x + "," +
    d.target.y;
  })


  node
  .attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")"; });

};






    var startingValue = .8
    var domain = [-1, 0 ,1]
    var value = startingValue
    var range = ["#F44336", "#64B5F6" ,"#8BC34A"]
    var colors = d3.scale.linear()
    .domain(domain)
    .range(range);
    var columns=["sentiment","trust_score","rating","helpful_score","review_text"];
    var columns_nice=["sentiment","trust score","rating [1,5]","helpfulness","review text"];

    var data= [
	{sentiment: 0.225758, trust_score: 0.793063, rating: 4.000000, helpful_score: "N/A", review_text: "While Sony products are exceptional ,the models XBR46 and XBR 52 in have been given extended warranties because of problems with the LCD panels.Mine was 14 months old and out of warranty when the pictures were all screwed up.It was only by researching online that I fell across Sony\"s nondescript announcement about the panel.Sony promptly sent a technician to my house and I got a new LCD panel yesterday."}, 
	{sentiment: 0.142611, trust_score: 0.186542, rating: 5.000000, helpful_score: 1 / 2, review_text: "This TV is very easy to find, just go to retailer and find the one that has the Brightest and clearest picture of all.  I purchase my in mid Dec 2006 and use PS3 for Blu-ray on it - it is the sharpest picture I ever seen.It has absolutely 100% no cloudness on screen.  I am surprise in reading some reviews - I would not doubt this reviewers don't even own the TV.  Maybe I am just luck by my TV is very clear - even so much I would rather watch it than on my front screen HDTV projector. Blu-ray is sharpest image available - can see little hairs on peoples faces.My only wish is that it was bigger - but then again - it would be much more expensive. It is expensive - but well worth the money.Just an update, it is May 2013 and still running strong."},

    {sentiment: -0.072619, trust_score: 0.884863, rating: 2.000000, helpful_score: 12 / 19, review_text: "MURA!  CLOUDS!  INCONSISTENT BACKLIGHT!  Whatever you want to call it, both Sony and Samsung have DEFECTIVE LCDs.  I've had nothing but MURA problems with the Samsung so I went and bought a Sony, and guess what, it's worse!  Unfortunately, if you want a large LCD (46\" and over) you will be stuck with clouds as the Sharp has it's own problems (banding) and the other manufacturers make garbage, so I would wait on this purchase."},

    {sentiment: 0.188442, trust_score: 0.792998, rating: 3.000000, helpful_score: 26 / 34, review_text: "I got this TV and don't know why the image move in \"tiny steps\" instead of moving smooth.the issue is the most visible when the screen \"pans\" from left to right, or top to bottom, then the \"view\" will move in \"tiny steps\" instead of moving smooth... (the tiny steps is like, the stone will move half an inch, and then half an inch, and another half an inch, instead of moving smoothly or continuously).... i have never seen a stone move like that in real life, so it is giving me a bit of headache when i watch a movie... if i buy such an expensive tv and then end up watching movies on my old 24 inch CRT (tube) tv, then this LCD tv will be somewhat of a waste...also, it seems that the HDTV over-the-air signal is better. The HDMI input is the most problematic... I have tried using the Panasonic 1080 upscaling DVD player DVD-s52s and also the Samsung Blu Ray disc player and make sure they output 1080... and the results are the same.If the image doesn't move very much, then the image quality is superb though. If it is a football commentator discussing the play and waving his hands, then i already see the \"moving in tiny step\" problem."},
	
	{sentiment: 0.055476, trust_score: 0.793309, rating: 4.000000, helpful_score: 1 / 4, review_text: "There is some cloudiness in the lcd screen...if you cannot see it, chances are you didn't notice it...try watching the tv in a dark room and turn power saving off and maximum brightness. You'll see some clouds when credits are played at the end of the movie, or even when you're switching inputs to a dark screen. Overall, every other color displayed besides black was very clear and beautiful."},

    {sentiment: 0.450000, trust_score: 0.885801, rating: 4.000000, helpful_score: 11 / 30, review_text: "This Sony displays a beautiful picture but what is the difference between the XBR2 and the XBR3.  The unit advertised here is the XBR2.  The advertised price difference is about $200 more for the XBR3.  I have looked at the published specs but they seem to be the same."},

    {sentiment: 0.204351, trust_score: 0.833174, rating: 4.000000, helpful_score: 8 / 9, review_text: "I have this TV for more 1 month. I don't think this TV set is as bad as what the others had described in their reviews. I think this TV is great despite of high price. Good/Clear picture, vivid color and sound. Nice looking. Though, it appears to be having some clouds i.e. non-uniformly color distribution at plain dark scene. In my opinion, it won't affect the quality of pictures for normal use, including HDTV, DVD, PS3 Blueray. Definitely, it is not a big deal to me. I think this unit deserves a better rating - not the highest due to cloud effect. I also purchase a DVI to HDMI cable to hook up my Powerbook to the TV.... Man, it is so cool to have a 46\" LCD display for my computer!I was debating to purchase either this unit or Sharp 50\" LCD. And I finally decided to go with this unit because of vivid color and nice design. More importantly, it has 3 HDMI inputs. Nice overall! You should go to BestBuy or Circuit City to check it out before placing your order.I do not regret on this purchase at all."},

    {sentiment: 0.327183, trust_score: 0.316500, rating: 5.000000, helpful_score: 1 / 2, review_text: "I got into LCD TVs a year or so ago.  Started with a Phillips 20 inch (720p) was not impressed with it --- moved it to the spare bedroom and got a Sony 26 inch (720p) for my bedroom and this was a big improvement over the Phillips,  I was so impressed with this Sony that I kept waiting for the Sony XBR 46 to come down in price --- when I was able to get one for about $2500, I jumped at the chance.  I have had it for about 6 months now --- it replaced a JVC 36 inch CRT.This Sony XBR 46 inch LCD TV is the best tv that I've ever had (have had over 20 tvs) --- picture quality is awesome when watching good quality HD input (HDSHO, HDHBO, HDUNI, HDMOV, MOJO, HDTNT, NDNET, NDNG, HDDSC,etc.)  However, the local HD channels here in Hawaii suck, might as well be standard def. (are not wide screen and do not have enhanced sound).  With the quality HD input and enhanced sound with a good A/V receiver you are approaching theater quality.Standard def. programs are far superior on this tv to what I saw on any previous tv i've owned.  Also, the tv is very energy efficient:  the tv, cable box and A/V system draws only about 2.7 amps.  The onscreen menus are good and easy to navigate --- inputs that are not used can easily be disabled.  The only short coming that I can think of is the tv does not have PIP (picture in picture) which is great when watching football games.Up converted DVDs look great on this tv --- look so good that I am going to wait awhile longer before getting a Blue-Ray."},

    {sentiment: 0.172917, trust_score: 0.186430, rating: 5.000000, helpful_score: 8 / 13, review_text: "I bought this TV a little over a week ago. It was delivered in 4 days and unlike other people, the Eagle freight service just left it in my living room (no unpacking or making sure it worked). After unpacking it and connecting the cables to my PS3 I watched a coupleo of blu-ray movies and the image is great! I haven't noticed any clouds (build date is january 2007) in dark scenes."},

    {sentiment: 0.288880, trust_score: 0.316973, rating: 5.000000, helpful_score: 16 / 17, review_text: "I recently purchased the 46XBR2 46\" inch LCD HDTV.  I love it.  We sit an average of 8' from the screen when we watch it and it is very comfortable.  It is not too close.I have seen the clouding that some of the critics have mentioned, but I have only noticed it when the television is on, but there is no actual signal to the television.  In short, it does not effect the actual viewing experience.I have also read that some people think that the speakers are terrible, but I disagree.  For television speakers, the television sounds great.  It is not a theater sound, but it sounds great.The picture is great with natural color.  Not as spectacular as the Samsung in contrast and color, but ultimately easier to live with.  The color production seems far more natural and easy on the eye, but not \"eye candy.\"  The Sony seems to have a picture that seems to have a 3 dimensional quality.  When I looked at the Sharp and Samsung, they looked more like pretty wallpaper, but without the dimensional quality.The LG looks like a very good television for the money, and the color production on the Mitsubishi is spectacular.  I have not compared them with the Sony for the sense of depth, but they both seem to be a great television for the money and hundreds if not a thousand off the price of the Sony.Finally, our viewing rooms have lots of window light. The plastic screen on LCD televisions do not have  significant reflection like plasma televions or standard tube televisions with glass screens.  Plasmas are great if you have a theater room.  In many ways, the plasma produces a superior picture, but mostly in a dark room that minimizes reflection on the screen.  If you have a room that has lots of light natural or from interior lighting, the LCD is a better purchase."},

    {sentiment: 0.045644, trust_score: 0.883781, rating: 4.000000, helpful_score: 25 / 34, review_text: "I purchased the 46 inch model and have, fortunately, not experienced the \"clouds\" problem, but I have other issues. Although I like the set's general performance, it has several annoyances with regard to the technological functionality, for want of a better terminology.1. If I muted my old set, closed captioning appeared. When I \"unmuted\", the sound came back and the captioning disappeared; a very simple operation. The Sony set - and I've confirmed this with Sony - can get closed captioning only by use of the menu and it is either \"on\" or \"off\" irrespective of the sound being on or off. Although brief use of closed captioning, when the set is muted for a phone call, may be useful, having it on constantly is very annoying. It can only be turned off by going through the menu. Sony has confirmed that all their TVs use the same system. Even JVC has only one 26 inch model with the older system. This may be a new, but inconvenient trend.2. The set is supposed to automatically choose the `correct\" screen format. I can't really understand all the differences, but some formats seem almost ridiculous. For example, \"Wide Zoom\" and \"Full\" seem identical and \"Full Zoom\" cuts of some of the image. However, as I tried to figure things out, I chose the \"Normal\" setting, an override to an almost square image with wide vertical bars. Assuming that the set selects the best image, I tested what happens if I then shut the set off and turn it back on; it remains at the \"Normal\" setting - or whatever the setting might have been. I realized that the \"Auto Wide\" feature was turned off - -at least as the set was received; turning it on makes no difference - again confirmed by Sony. So, I'm really still confused as to how images are selected and what is the best format; I've arbitrarily chosen \"Full\" and, depending on the program, I get a full screen or horizontal bars. The \"Auto Wide\" seems to serve no purpose.3. An annoying feature is that one requires use of the menu to select DVD or VCR, etc. However, at least in my setup, as I am not using a cable box, but have my cable into my VCR and then to the TV, I can switch to channel 3 with much less fuss and, after use of the VCR, just select any desired channel. However this doesn't work for the DVD and if and when I add a cable box will not work for the VCR. But why bother with multiple steps? One should be able to switch with just the push of a button.4. The two additional nuisances related to the Universal Remote. It is not fully able to replace, for me at least, my DVD and VCR remotes. For the DVD, there is no button to open and close the disk holder. This is trivial (except for my habit) because one has to go up to the set to insert/remove the DVD. However, the VCR deficiency is more annoying because it can not be used to program my VCR for future recording.And finally, there is the additional issue of the factory settings I was rather amazed to see what I thought are less than optimal settings. Some examples: the color is set to \"vivid\" rather than \"normal\" although the manual suggests the latter as optimal for most viewing and to \"cool\" (confirmed by Sony) which increases blue tones; the treble and base are not set at mid-point; the \"Auto Wide\" feature is off; the sound equalization for constant volume is off; etc."},

    {sentiment: 0.216905, trust_score: 0.793011, rating: 1.000000, helpful_score: 18 / 25, review_text: "Sony has had a lot of great products in it's past but as of late they have had a lot of misfires. This 46\" TV could have been the best LCD TV in the market, yet it fails. The colors are amazing, but when black comes on, MURA artifacts ruin the image. The reason for this problem stems to quality control and these sets are MADE IN MEXICO, so I assume they have problems there. My set was dated DECEMBER 2006 and had severe problems, so there is no way of getting a good one based on a date. It's such a shame, the TV is quite something.Sony, why can't you get it right anymore?"},

    {sentiment: 0.467614, trust_score: 0.213584, rating: 5.000000, helpful_score: 10 / 13, review_text: "My set was manufactured in January 2007.  I don't that that matters since Sony never acknowledged a problem.  Why would they fix it.I find the set has excellent build quality.  Solid, heavy and well constructed.  The image out of the box is way to VIVID which is the default setting.  To get a pleasing picture, my personal taste, I had to tweek it.  There are so many adjustments available that I may be tweeking for another week as I search for the best settings.This is one beautiful TV and with the new sale price of under $3,000 I think I found the perfect TV.  Looks great ever when it is turned off."},
	
	{sentiment: 0.146263, trust_score: 0.186429, rating: 5.000000, helpful_score: 3 / 4, review_text: "I physically viewed SEVERAL 46\"-47\" TV's, in the store-1. The Plasma's had a very good pic, but the reflection from the shiny screen was AWFUL (LCD's have satin... screen)! Sound was puny on the other models.2. The sound quality on ALL other brands(6w-12w), but the 24w XBR2 was barely louder than a loud speaking voice.The Vizio salesmen tried to talk me into a home theatre system to improve loudness....- I don't want to hassle with several controls (extra electricity too!), every time I want to watch TV!The 24w sound system on the XBR2 is AWESOME!- Even has an auto-adjust feature that keeps the sound level the same when switching to different channels...!The cheaper SONY's also had puny/low quality sound!3. I don't have any clouding issues (mfg. April, 2007).4. XBR2 vs Cheaper SONY 46\" TV's picture quality- The XBR2 was MUCH better/SHARP (side by side comparison). You can see the skin wrinkles...On the cheaper models, the skin was flat & washed out (much like a clothes mannequin in a store!).The colors were MUCH brighter & true, on the XBR2.Cons (not bad)- I fooled with ALL the picture settings-EASY-You can actually see what they do, when selected!, and I like the  sharpness/quality of Normal (4/3 ratio- Just as tall, but not as wide), better for most viewing (DVD likes wide/zoom, but I still usually use 4/3- easy to change on control).Note- I tried some inexpensive HDMI signal cables (A MUST HAVE!), and was not impressed!I ended up buying RCA brand cables with HEAVY shielding (relatively inexpensive! vs Monster... cables!)!- 20% improvement (switching back and forth)!RCA HD6HH 6 Foot HDMI Cable"},

    {sentiment: 0.070333, trust_score: 0.884995, rating: 4.000000, helpful_score: 66 / 70, review_text: "I previously had a Westinghouse 42\" 1080p LCD that went bad after just 6 months! I used my service plan and got a full refund since they didn't even want to touch the thing. The only problem i've found that that the prices in 6 months actually increased and suddenly I found that 42\" 1080p LCDs were less common.I first went with the Samsung LN-S4695D. I had some major issues with that so  returned it for this. I originally skipped this Sony for the Samsung because it was cheaper.When I purchased this I knew of the cloud issue and had them deliver it and crossed my fingers. Turned it on and after awhile I noticed clouds. The problem in all honesty does not bother me AT ALL EVER. I think in the 4-5 months i've owned this i've noticed it once or twice. Please note that I almost NEVER watch TV in the dark. If you do, maybe it's more of a problem. Sony's claim that it's \"normal\" is such a joke. How could you ship out thousands of these LCDs with this issue and knowing it's there? I've knocked off a star due to this. For the price you pay on this thing (it was more expensive when I bought it months ago) you'd expect it to be perfect. My first Sony was. It's not true that there is no PERFECT TV out there. There is.Anyway, I immediately calibrated this using AVIA and DVE and the picture quality is even better than any previous TV i've owned by far. This thing has so many features in the menu system that you could spend hours just configuring it to get it right. I disliked the menu system on the Samsung and this one is so much better. It's really easy to navigate and not slow.This also has so many different types of connections. Three HDMI ports. Most people think two is enough, but I don't agree. I currently use all three. Switching inputs on previous Sony televisions was a pain. Now it's a little bit easier. To press a button to display 'external inputs' and switch to the one you want. You can even label the inputs. I have mine set to PC, Wii, PS3, Cable and DVD PLAYER.Games show no ghosting at all that i've noticed. A couple times i've noticed very slight motion smearing on really low quality cable TV. It's extremely rare and i'm going to blame my cable provider because it never happens on DVDs or anything else.I don't use the TV speakers but I do when I connect my HD antenna up. That's about once every 2 weeks for NBA games in HD. Some would complain it sounds bad but they've probably never heard sound from other LCDs. My mother's plasma display has such bad sound that it sounds like it's coming from a $2 speaker. Honest. It's impossible to listen to it it's so bad. The sound from the speakers isn't good, but acceptable. My guess is that a large percentage of the people that buy a TV this expensive have a home theater system. I currently use a Yamaha Sound Projector since i'm in an apartment.The design is much better than my Samsung I previously tried out. The only problem is that it will not tilt/rotate like the Samsung did. Not a big deal for me but it would have been nice. The design on the back is not good. It's hard to access all the HDMI and cable inputs. I'd imagine it's like this due to some people wanting to mount this on a wall? It's nothing  that bad.HD-DVDs and Blu-Ray movies are pretty amazing on this thing. Same goes for Playstation 3 games. DVD movies even look good but it depends on the DVD quality. Old movies don't really look good. I'm mainly talking about DVDs that came out when the players cost a fortune. I've compared the picture quality between an upconverted movie and one that's not and I definitely  notice a huge difference.I will admit though that my Oppo DVD player hates this LCD. It will display dark scenes but they will contain greenish tint/macroblocks etc. I thought it was the LCD but i've tried 5 others and this does not occur. I've tried many ways to fix this with not much luck. I currently use the Denon 575 and so far so good.Standard \"Digital\" cable still looks terrible in most cases. I don't have HD cable yet and my cable provider's picture quality is terrible. That's all. It's not the TV's fault. Too bad I can't get Satellite TV out here.I also was pretty impressed with the results I got when I connected my PC to this. Seeing your desktop at 1080i is pretty nice. I don't really use this feature though much. I've played a game that supports widescreen at that high of resolution (Final Fantasy XI) and it looks pretty good!Other than the few negatives above, I can't think of many. I've waited months to post a review. I really wanted to give it some time. So far i've not experienced many problems at all.The cloud issue might make it a risk buying this. Maybe they've fixed the problem already. Even with the cloud issue it's still a good TV. BTW my clouds are nearly impossible to see until I have a completely black screen and my lights are down. I have them on the top left and bottom left. When the actual movie plays they are GONE. Completely unless a scene is completely black, not just a little dark.If I run into anything bad i'll update this review. So far, so good!"},

    {sentiment: 0.266458, trust_score: 0.282334, rating: 5.000000, helpful_score: 2 / 2, review_text:" Got this for x-mas for the family.  At first it took a little tinkering to get all the settings on the TV and cable box right (this gave me a big sinking feeling as the picture was poor until I fixed things), but now the picture is excellent - all I dreamed of in my TV addicted brain.  The thing is huge and impressive.  I have not noticed any of the \"clouds\" in the black areas as were mentioned in previous reviews.  The biggest problem is that there are only a limited number of television channels that broadcast in HD right now.  However, I'm sure that will change as more people own these sets and the demand increases.Overall - a great deal, excellent picture.  I would buy it again in a heart beat."}
	];

     var dummy = [ {sentiment:"No reviews",  trust_score:"No reviews", rating :"No reviews", helpful_score:"No reviews" , review_text:"No reviews" }];

 // Rounding Function
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();


    d3.select('#slider4').call(d3.slider().axis(true).min(-1).max(1).step(0.2).value(startingValue).on("slide", function(evt, value) {
        d3.select('#slider4text').text(Math.round10(value,-1));
        updateTableSentiment(data,value);
        d3.select('.colour').style('background',colors(value));
        d3.select('#slider4').style('background',colors(value));

        if(value > .45){
            d3.select('.colour').classed("happy", true);
        }else{
            d3.select('.colour').classed("happy", false);
        }
        if( -.45 < value && value < .45){
            d3.select('.colour').classed("medium", true);
        }else{
            d3.select('.colour').classed("medium", false);
        }
        if( -.45 > value){
            d3.select('.colour').classed("sad", true);
        }else{
            d3.select('.colour').classed("sad", false);
        }

    }));

console.log(value);

     d3.select('.d3-slider-handle').style('background',colors(value));
    d3.select('.d3-slider-handle').classed("colour", true);
    d3.select('.d3-slider-handle').classed("happy", true);
    d3.select('#slider4').style('background',colors(value));





var table= tabulate(dummy, columns, columns_nice);
 updateTableSentiment(data,startingValue);

 // var dynamic = d3.select('.d3-slider-handle')
 //     .on("drag",null)


function tabulate(data, columns,columns_nice) {
        table = d3.select('#container').append('table')
                    .style("border-collapse", "collapse")
            .style("border", "1.5px black solid"),
        thead = table.append('thead'),
        tbody = table.append('tbody');


        // append the header row
        thead.append('tr')
          .selectAll('th')
          .data(columns_nice).enter()
          .append('th')
            .text(function (column) { return  column; });

        //console.log(columns);

        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
          .data(data)
          .enter()
          .append('tr');


        // create a cell in each row for each column
        var cells = rows.selectAll('td')
          .data(function (row) {
            return columns.map(function (column) {
              return {column: column, value: row[column]};
            });
          })
          .enter()
          .append('td')
            .text(function (d) { return d.value; });

        console.log(cells);

      return table;
    }



function updateTableSentiment(data,value){

     var subset = [];

    for (i=0; i<data.length; i++){
        if (FilterFunc(data[i],value)===true) {
        subset.push(data[i]);
    }
    }
    if (subset.length===0){
        updateEmpty();
}
else{
    update(subset);
}
}


function update(newdata){

     var cells= tbody.selectAll("tr")
        .data(newdata)
        .selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {
                    column: column,value: row[column]
                };
            });
        })
        .text(function(d) {return d.value;});

    var rows = tbody.selectAll('tr')
      .data(newdata);
    var rowsenter = rows.enter().append('tr');

    rowsenter.selectAll('td')
        .data(function (row) {
            return columns.map(function (column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append('td')
        .text(function (d) { return d.value; });
    rows.exit().remove();

    }


function updateEmpty(){

     var cells= tbody.selectAll("tr")
        .data(dummy)
        .selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {
                    column: column,value: row[column]
                };
            });
        })
        .text(function(d) {return d.value;});

    var rows = tbody.selectAll('tr')
      .data(dummy);
    var rowsenter = rows.enter().append('tr');

    rowsenter.selectAll('td')
        .data(function (row) {
            return columns.map(function (column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append('td')
        .text(function (d) { return d.value; });
    rows.exit().remove();

    }

function FilterFunc(row,value){
    if (row.sentiment>=value -.05 && row.sentiment<=value + .05){
        return true;
    }
    else{
        return false;
    }
}

}
function filterPos(opacity, color,str){

  d3.selectAll(".person").select('path')
  .transition()
  .duration(500)
  .attr("style", "fill:red; stroke:red; stroke-width: 2px;" ).call(fadeAll(opacity,color,str));


}
function allColor(color1, color2,str){

  d3.selectAll(".person").select('path')
  .transition()
  .duration(500)
  .attr("style", "fill:red; stroke:red; stroke-width: 2px;" ).call(newColor(color1,color2,str));


}



function fadeAll(opacity,color,str) {

  return function(d) {
    var e = [];
    d.each(function(a, i) { e[i] = a; });


    path.style("stroke-opacity", function(o) {
      return eval(str)  ? 1 : opacity;
    })
    .style("stroke", function(o) {
      return eval(str)  ? color : "#000";
    });
  };

}
function newColor(color1,color2,str) {

  return function(d) {
    var e = [];
    d.each(function(a, i) { e[i] = a; });


    path.style("stroke-opacity", function(o) {
      return 1
    })
    .style("stroke", function(o) {
      return eval(str)  ? color1 : color2;
    });
  };

}

