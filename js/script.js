// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 获取所有带子菜单的菜单项
    const menuItems = document.querySelectorAll('.menu-item.has-submenu');
    
    menuItems.forEach(item => {
      // 点击菜单项切换状态
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        // 切换展开/收起状态类
        item.classList.toggle('expanded');
      });
      
      // 点击子菜单链接不关闭菜单
      const submenuLinks = item.querySelectorAll('.submenu-link');
      submenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      });
    });

  // 为所有网盘链接添加target="_blank"（确保新开窗口）
  const panLinks = document.querySelectorAll('.pan-link');
  panLinks.forEach(link => {
    link.setAttribute('target', '_blank');
  });
});
