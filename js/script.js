// 页面加载完成后执行
$(document).ready(function () {
  
   // 获取正在热播的数据
  $.getJSON('json/tv-json.json', function(data) {
    // 筛选类别为"正在上映"的电视剧
    const hotTvList = data.filter(item => item.类别 === "正在上映");
    // 筛选类别为"正在上映"的电视剧
    const chnTvList = data.filter(item => item.类别 === "国产精选");
    // 筛选类别为"正在上映"的电视剧
    const usTvList = data.filter(item => item.类别 === "欧美精选");
    // 清空原有内容
    $('#hot-tv').empty();
    $('#chn-tv').empty();
    $('#us-tv').empty();
    
    // 遍历数据并生成列表项
    hotTvList.forEach(item => {
      const $item = $(`
        <div class="resource-item">
          <b>${item.资源名称}</b>
          <a href="${item.资源链接}" class="pan-link" target="_blank">${item.资源链接}</a>
        </div>
      `);
      $('#hot-tv').append($item);
    });
    chnTvList.forEach(item => {
      const $item = $(`
        <div class="resource-item">
          <b>${item.资源名称}</b>
          <a href="${item.资源链接}" class="pan-link" target="_blank">${item.资源链接}</a>
        </div>
      `);
      $('#chn-tv').append($item);
    });
    usTvList.forEach(item => {
      const $item = $(`
        <div class="resource-item">
          <b>${item.资源名称}</b>
          <a href="${item.资源链接}" class="pan-link" target="_blank">${item.资源链接}</a>
        </div>
      `);
      $('#us-tv').append($item);
    });
    
  }).fail(function() {
    console.error('加载电视剧数据失败');
  });



  // 获取所有带子菜单的菜单项
  $('.menu-item.has-submenu').each(function() {
    var $menuItem = $(this);
    
    // 点击菜单项切换状态
    $menuItem.on('click', function(e) {
      e.stopPropagation();
      // 切换展开/收起状态类
      $menuItem.toggleClass('expanded');
    });
    
    // 点击子菜单链接不关闭菜单
    $menuItem.find('.submenu-link').on('click', function(e) {
      e.stopPropagation();
    });
  });
  // 为所有网盘链接添加target="_blank"（确保新开窗口）
  $('.pan-link').attr('target', '_blank');

  // 滚动监听：当页面滚动时，高亮对应的菜单项
  $(window).on('scroll', function() {
    // 获取所有内容区域的section元素
    const sections = $('section.content-section');
    
    // 获取页面滚动位置
    const scrollPosition = $(window).scrollTop() + 150; // 150px 偏移量，确保在可见区域内
    
    // 遍历所有内容区域
    sections.each(function() {
      const $section = $(this);
      const sectionTop = $section.offset().top;
      const sectionBottom = sectionTop + $section.outerHeight();
      
      // 判定当前滚动位置是否在该区域
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // 移除所有菜单项的高亮类
        $('.menu-item').removeClass('active');
        
        // 为当前对应的菜单项添加高亮类
        const targetId = $section.attr('id');
        const $menuLink = $('.menu-link[href="#' + targetId + '"]');
        if ($menuLink.length) {
          $menuLink.closest('.menu-item').addClass('active');
        }
      }
    });
  });
// 点击菜单项时，平滑滚动到对应位置
  $('.menu-link,.submenu-link').on('click', function(e) {
    e.preventDefault();
    const targetId = $(this).attr('href');
    const targetElement = $(targetId);
    
    if (targetElement.length) {
      $('html, body').animate({
        scrollTop: targetElement.offset().top - 50 // 50px 偏移，保持在页面顶部
      }, 500);
    }
  });


});