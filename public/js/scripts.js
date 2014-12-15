/**
 * Created by VamsiReddy on 12/14/2014.
 */
$(document).ready(function(){
   $("#post-comment").hide();
   $('#btn-comment').on('click',function(){
      event.preventDefault();
      $("#post-comment").show();
   });
   $("#btn-like").on('click',function(){
      event.preventDefault();
      var imgId= $(this).data('id');
      $.post('/images/'+imgId+'/like').done(function(data){
         $('.likes-count').text(data.likes);
      });
   });
});