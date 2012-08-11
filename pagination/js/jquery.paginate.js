//Developed By Pragnesh Chauhan : pragnesh_chauhan@yahoo.co.in
(function($){
    $.fn.paginate = function(options) {
        // set some defaults
        var defaults = {
            start: 0,
            limit: 5,
            paginateDiv : '',
            activeClass : '',
            firstLastClass : '',
            showNav: false
        };
        
        var options = $.extend(defaults, options);
        var currPage = 0;
		
        return this.each(function(){
            var obj = $(this);
            //show start to limit element
            obj.children().hide().slice(options.start, options.limit).show();
            
            //count no of element
            var no_of_items = obj.children().size();
            
            //no of pages
            var no_of_page = Math.ceil(no_of_items/options.limit);
            
            //add paginate div if not set
            if(options.paginateDiv == ''){ 
                $paginate = document.createElement('div');
                $($paginate).attr('id','paginate');
                $(this).after($paginate);
                options.paginateDiv = '#paginate';
            }
            
            //show pagination only if no_of_itmes greater than limit
            if(options.limit < no_of_items){
                $navFirst = document.createElement('input');
                $navPrev = document.createElement('input');
                $($navFirst).addClass(options.firstLastClass).attr({
                    'type':'button',
                    'id':'navFirst'
                }).val('First').bind('click',function(){
                    $('.navigation').removeClass(options.activeClass);
                    //$(this).addClass(options.activeClass);
                    currPage=0;
                    showpage(currPage);
                });
                
                $($navPrev).addClass(options.firstLastClass).attr({
                    'type':'button',
                    'id':'navPrev'
                }).val('Prev').bind('click',function(){
                    if(currPage > 0){
                        $('.navigation').removeClass(options.activeClass);
                        currPage--;
                        showpage(currPage);
                    }
                });
                $(options.paginateDiv).append($navFirst);
                $(options.paginateDiv).append($navPrev);
                
            
                //show page
                function showpage(page_no){
                    $('.navigation[name=' + page_no +']').addClass(options.activeClass).siblings(options.activeClass).removeClass(options.activeClass);
                    newstart = page_no*options.limit;
                    newlimit = newstart+options.limit;
                    obj.children().hide().slice(newstart, newlimit).show();
                }
            
                //show page number
                if(options.showNav){
                    for(var i=1; i<=no_of_page; i++){
                        $navbtn = document.createElement('input');
                        $($navbtn).addClass('navigation '+options.firstLastClass).attr({
                            'type':'button', 
                            'name':(i-1)
                        }).val(i);
                        $(options.paginateDiv).append($navbtn);
                    }
                    $('.navigation[name="0"]').addClass(options.activeClass);
                }
            
                $navNext = document.createElement('input');
                $navLast = document.createElement('input');
                $($navNext).addClass(options.firstLastClass).attr({
                    'type':'button',
                    'id':'navNext'
                }).val('Next').bind('click',function(){
                    if(currPage < parseInt(no_of_page-1)){
                        $('.navigation').removeClass(options.activeClass);
                        currPage++;
                        showpage(currPage);
                    }
                });
                
                $($navLast).addClass(options.firstLastClass).attr({
                    'type':'button',
                    'id':'navLast'
                }).val('Last').bind('click',function(){
                    $('.navigation').removeClass(options.activeClass);
                    currPage = no_of_page -1;
                    showpage(currPage);
                });
                
                $(options.paginateDiv).append($navNext);
                $(options.paginateDiv).append($navLast);

            
                //go to clicked page
                $('.navigation').each(function(){
                    $(this).click(function(){
                        $('.navigation').removeClass(options.activeClass);
                        $(this).addClass(options.activeClass);
                        currPage = $(this).attr('name');
                        showpage(currPage);
                    });
                });
            }
        });
    };
})(jQuery);