/*
This file and all the code within are sole property of Srdjan Stanarevic and can not be used, distributed or copied in any form or capacity without prior written consent of the author.
contact: owner AT swtor-spy DOT com
*/
var default_tooltip_width=250;

function hide_tooltip(target_tooltip_div)
{
    if(typeof target_tooltip_div == 'undefined')
    {
        my_tooltip = jQuery('#tooltip');
    }
    else
    {
        my_tooltip = target_tooltip_div;
    }
    my_tooltip.css({left:"-9999px"});
    my_tooltip.hide();
}
function show_tooltip(event, target_tooltip_div)
{
    if(typeof target_tooltip_div==='undefined')
    {
        my_tooltip = jQuery('#tooltip');
        
    }
    else
    {
        my_tooltip = target_tooltip_div;

    }
    
    border_top = jQuery(window).scrollTop();
	border_right = jQuery(window).width();
    window_height = jQuery(window).height();
    
    var left_pos;
	var top_pos;
	offset = 10;
    

	if(border_right - (offset *2) >= my_tooltip.width() + event.pageX){
		left_pos = event.pageX+(offset*5);
		} else{
		left_pos = border_right-my_tooltip.width()-offset;
		}
    if(event.pageY + my_tooltip.height() + offset > border_top+window_height)
    {
        top_pos = border_top+window_height - my_tooltip.height();
        
    }
    else
    {
        
        top_pos = event.pageY+offset;
    }
	my_tooltip.css({left:left_pos, top:top_pos});
    //my_tooltip.css({left:0, top:0});
    my_tooltip.show();
}
function qi_show_tooltip(event, target_tooltip_div)
{
    
    my_tooltip = target_tooltip_div.find('span');
    
    var xkoordinata = event.pageX - target_tooltip_div.offset().left;
	var ykoordinata = event.pageY - target_tooltip_div.offset().top;

    xkoordinata+=20;

	
	my_tooltip.css({left:xkoordinata, top:ykoordinata});
    //my_tooltip.css({left:0, top:0});
    my_tooltip.show();
}
function qi_hide_tooltip(target_tooltip_div)
{
    my_tooltip = target_tooltip_div.find('span');
    
    my_tooltip.css({left:"-9999px"});
    my_tooltip.hide();
}

function attach_mouseover()
{
    jQuery('tr[id*="tr_planet"]').each(function(index) {
        var planet_id=this.id;
        var planet_id=planet_id.replace(/[^\d]+/,'');
        
        if(data[planet_id]!=null)
        {
            jQuery(this).mouseover(function(event) {
                
                var tooltip_content = '<h3 style="width:100%; text-align: center;">'+data[planet_id][2]+'</h3>'
                tooltip_content += '<img src="'+data[planet_id][1]+'" style="float: left;" class="icon" />';
                if(data[planet_id][0] != null)
                {
                    tooltip_content += data[planet_id][0]
                }
                else
                {
                    tooltip_content += '<div style="clear: both"></div>';
                }
                jQuery('#tooltip_content').html(tooltip_content)
                show_tooltip(event);
            });
            jQuery(this).mousemove(function(kmouse){
                show_tooltip(kmouse);
            });
            jQuery(this).mouseleave(function() {
                
                hide_tooltip();
            });
        }
    });
    jQuery('tr[id*="tr_companion"]').each(function(index) {
        var companion_id=this.id;
        var companion_id=companion_id.replace(/[^\d]+/,'');
        if(data[companion_id]!=null)
        {
            jQuery(this).mouseover(function(event) {
                if(data[companion_id][2]!='')
                {
                    var tooltip_content = '<h3 style="width:100%; text-align: center;">'+data[companion_id][2]+'</h3>';
                }
                else
                {
                    var tooltip_content = '<h3 style="width:100%; text-align: center;">NDA protected</h3>';
                }
                tooltip_content += '<img src="'+data[companion_id][1]+'" style="float: left;" class="icon" />';
                if(data[companion_id][0] != null)
                {
                    if(data[companion_id][0]=='')
                    {
                        tooltip_content += 'Until the NDA is dropped data for this companion will remain hidden. Thank you for your understanding.';
                    }
                    else
                    {
                        tooltip_content += data[companion_id][0];
                    }
                }
                
                tooltip_content += '<div style="clear: both"></div>';
                
                jQuery('#tooltip_content').html(tooltip_content)
                show_tooltip(event);
            });
            jQuery(this).mousemove(function(kmouse){
                show_tooltip(kmouse);
            });
            jQuery(this).mouseleave(function() {
                
                hide_tooltip();
            });
        }
    });
    
    var itemstofetch='';
    var all_item_links=jQuery('a[id*="a_item"]');
    if(!jQuery.isEmptyObject(all_item_links))
    {
        all_item_links.each(function(index) {
            var item_id=this.id.replace(/[^\d]+/,'');
            if(item_id!= null && item_id>0)
            {
                itemstofetch+=','+item_id;
            }
            
            
        });
    }
    if(itemstofetch!='')
    {
        jQuery.getJSON('/item_tooltip.php', 'term='+itemstofetch, function(data) {
            if(!jQuery.isEmptyObject(data))
            {
                all_item_links.each(function(index) {
                    var item_id=this.id.replace(/[^\d]+/,'');
                    if(data[item_id]!=null)
                    {
                        jQuery(this).mouseover(function(event) {
                           var tooltip_content =  data[item_id];
                           jQuery('#tooltip').width(322);
                           jQuery('#tooltip_content').width(310);
                           jQuery('#tooltip_content').html(tooltip_content)
                           show_tooltip(event);
                        });
                        jQuery(this).mousemove(function(kmouse){
                            show_tooltip(kmouse);
                        });
                        jQuery(this).mouseleave(function() {
                            hide_tooltip();
                        });
                    }
                });
            }
            
        });
    }
    var cs_complements=[["Armormech","Scavenging","Investigation","UnderworldTrading"],
    ["Armstech","Scavenging","TreasureHunting"],
    ["Artifice","Archaeology","TreasureHunting","UnderworldTrading"],
    ["Biochem","Bioanalysis","UnderworldTrading"],
    ["Cybertech","Scavenging","Slicing","TreasureHunting","UnderworldTrading"],
    ["Synthweaving","Archaeology","Diplomacy","Investigation","UnderworldTrading"]
    ];
    var cs_cache = new Array;
    jQuery("#crew-skills-table tr").each(function(index) {
       var row_id=this.id;
       var tooltip_content = '';
       jQuery(this).mouseover(function(event) {
         var display_once=false;
            jQuery.each(cs_complements,function (cs_index,cs_array){
                var found=false;
               jQuery.each(cs_array,function (k,v){
                        if(row_id==v)
                        {
                            found=true;
                            return;
                        }
                    });
                if(found)
                {
                    if(display_once)
                    {
                        //jQuery('#tooltip_content').append( '<hr />');
                        jQuery('#tooltip_content').append( '<center>OR</center>');
                        jQuery('#tooltip_content').append( '<hr />');
                    }
                    else
                    {
                        jQuery('#tooltip_content').html('Goes well with: <br />');
                    }
                    tooltip_content=' ';
                    jQuery.each(cs_array,function (k,v){
                        if(row_id!=v)
                        {
                            var img_alone=jQuery("#"+v+" td img").clone();
                            var name_alone = jQuery("#"+v+" td h3").clone();
                            var img_altered=img_alone.width('20px');
                            img_altered.appendTo('#tooltip_content');
                            jQuery('#tooltip_content').append( name_alone.html());
                            jQuery('#tooltip_content').append( '<br />');
                        }
                    });
                    display_once=true;
                    
                }
                   
            });
            
            if(tooltip_content!='')
            {
            
                show_tooltip(event);
            }
                
       });
       jQuery(this).mousemove(function(kmouse){
            if(tooltip_content!='')
            {
                show_tooltip(kmouse);
            }
                
            });
        jQuery(this).mouseleave(function() {
            
            hide_tooltip();
        });
    });
}
function next_skill_rank(skill_id)
{
    var skill_ids=skill_id.split('_');
    
    //are we allowed to click on this row?
    
    
    
    if(typeof current_rank[skill_id] == 'undefined')
    {
        current_rank[skill_id]=0; //initialize current_rank of skill
    }
    if(total_skill_points[skill_ids[0]] == null)
    {
        total_skill_points[skill_ids[0]]=0; //initialize
    }
    if(total_skill_points.total_points+1 > max_skill_points)
    {
        return;
    }
    if(skill_ids[1]*1 < (6-Math.floor(total_skill_points[skill_ids[0]]/5)))
    {
        return;
    }
    if(typeof data[skill_ids[0]][0][skill_ids[1]][skill_ids[2]] != 'undefined')
    {
        var podaci = data[skill_ids[0]][0][[skill_ids[1]]][[skill_ids[2]]];
        
        
        if((current_rank[skill_id]+1)*1 > podaci.p*1)
        {
           
            return;
        }
        current_rank[skill_id]++; 
        total_skill_points.total_points++;
        if(typeof total_skill_points[skill_ids[0]] != 'undefined')
        {
            total_skill_points[skill_ids[0]]++;
        }
        else
        {
            total_skill_points[skill_ids[0]]=1;
        }
        set_skill_tooltip(podaci, skill_id);
        display_totals();
        jQuery('#scp_'+skill_id).html(current_rank[skill_id]);
    }
    //have we unlocked a new row?
    var i;
    
      
    var row_to_unlock = 6 - Math.floor(((total_skill_points[skill_ids[0]])/5));
         
    if(total_skill_points[skill_ids[0]] >= (5 * (6 - skill_ids[1] + 1)) && row_to_unlock>=0)
    {
        
        for(i = 1; i<= 4; i++)
        {
            jQuery('#'+skill_ids[0]+'_'+(row_to_unlock)+'_'+i).css({ 'opacity' : 1 });
            
        }
    }
    update_permalink();
    
}