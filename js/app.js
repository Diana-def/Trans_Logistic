$(function(){
  
   let intro = $("#intro");
   let header = $("#header");
   /* вводим id из html */
   let introH = intro.innerHeight();
   let headerH = header.innerHeight();
   /* узнаем их расположение */
   
   /* затемнение шапки сайта
   =========================================== */
   
   headerScroll();

   $(window).on("scroll  resize", function() {
      headerScroll();
   });
   /* выполняем функцию headerScroll() сразу при каждом входе */
   
   function headerScroll() {
      let introH = intro.innerHeight();
      let headerH = header.innerHeight();
      /* перезаписываем переменныеб что бы всегде были актуальными */

      let scrollTop = $(this).scrollTop();

      if( scrollTop >= (introH - headerH) ) {
         header.addClass("header--dark");
      } else {
         header.removeClass("header--dark"); 
      }
   }
   
   /* 
   
   resize - ? типа переобновления данных хз не помню
   addClass - даем элементы указанный класс
   removeClass - удаляем указанный класс
   
   */
   
   /* плавный переход к блокам
   =========================================== */
   
   $("[data-scroll]").on("click", function(event) {
      event.preventDefault();
      /* ищем элементы с data-scroll, при клике на них меняется обычное поведение */
      
      let scrollEl = $(this).data("scroll")
      /* выясняется значение атрибута (из html) */
      let scrollElPos = $(scrollEl).offset().top;
      /* узнаем позицию элемента от верха страницы offset().top */
      
      $("html, body").animate({
         scrollTop: scrollElPos - headerH
      })
      
   })
   
   /* 
   
   $ - выборка элементов
   [data-scroll] - атрибут
   on() - событие
   event - отмена стандартного поведения 
   
   let - переменная
   $(this) - обращаемся именно к указаному элементу
   
   */
   
   /* ScrollSpy
    =====================================*/
   let windowH = $(window).height();
   
   $(window).on("scroll", function() {
      let scrollTop = $(this).scrollTop();
      /* отслеживаем позицию скрола в px */
      
      $("[data-scrollspy]").each(function() {
         /* ищем все элементы у которых в html есть дата атрибут data-scrollspy */
         
         let $this = $(this);
         let sectionId = $this.data('scrollspy');
         let sectionOffset = $this.offset().top;
         sectionOffset = sectionOffset - (windowH * .333333 );
         /* что бы включалось все не с самого начала экрана, а с 1/3 */
         
         if(scrollTop >= sectionOffset) {
            /* сравнивае позицию скрола и позицию элемента с дата атрибутом */
            $('#nav [data-scroll]').removeClass('active');
            /* изначально у всех элементов шапки с data-scroll убираем синий фон */
            $('#nav [data-scroll="' + sectionId + '"]').addClass('active');
            /* и только когда атрибут из шапки data-scroll совпадает с sectionId, непосредственно у секции при скроле, выдается клас синего фона */
         }
         
         if(scrollTop == 0) {
            $('#nav [data-scroll]').removeClass('active');
            /* если мы в самом верху никто синим не подсвечивается */
         }
      });
      
   });
   
   /*
   
   each - выборка по всем элементам с указынным атрибутом
   
   */
   
   $('[data-modal]').on('click', function(event) {
      event.preventDefault();
      /* меняем стандартное поведение этого элемента */
      
      let modal = $(this).data('modal');
      
      $('body').addClass('no-scroll');
      $(becomeClientMobal).addClass('show');
      
      setTimeout(function() {
         $('.modal').find('.modal__content').css({
            transform: 'translateY(0)',
            opacity: '1'
         });
      });
      /* плавно появляется */
   
   });
   
   $('[data-modal-close]').on('click', function(event) {
      event.preventDefault();
      let modal = $(this).parents('.modal');
      
      modalClose(modal);
   });
   /* выключает форму при клике на крестик */
   
   $('.modal').on('click', function() {
      let modal = $(this);
      
      modalClose(modal);
   });
   /* выключает форму при клике на темный фон */
   
   $('.modal__content').on('click', function(event) {
      event.stopPropagation();
   });
   /* не выключает форму при клике на саму форму */
   
   function modalClose(modal) {
      
      modal.find('.modal__content').css({
         transform: 'translateY(-100px)',
         opacity: '0',
//         background: 'rgba(0,0,0,.9)'
      });
      
      setTimeout(function() {
         $('body').removeClass('no-scroll');
         modal.removeClass('show');
      }, 200);
      
   }
   
});

