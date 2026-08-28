module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        'react-native-iconify/babel',
        {
          icons: [
            'mdi:heart',
            'mdi:home',
            'mdi:account',
            'feather:activity',
            'ant-design:message-outlined',
            'ic:baseline-search',
            'weui:location-outlined',
            'ion:link-outline',
            'line-md:star-filled',
            'mdi:bell', 
            'mdi:bell-outline',
            'tdesign:map-connection-filled',
            'typcn:th-menu-outline',
            'iconamoon:profile-bold',
            'mynaui:home-solid',
            'gg:work-alt',
            'tdesign:shortcut',
            'material-symbols:privacy-tip-outline-rounded',
            'famicons:accessibility-outline',
            'fluent:people-communication-24-regular',
            'pajamas:appearance',
            'pinhead:tipi-campsite-with-dollar',
            'tabler:reserved-line',
            'streamline-freehand:alerts-warning-triangle',
            'iconamoon:location-light',
            'eva:pricetags-fill',
            'fa-solid:location-arrow',
            'mingcute:map-pin-fill',
            'boxicons:swap-vertical',
            'mdi:car-off',
            'mdi:motorbike-off',
          ],
        },
      ],
    ],
  };
};                 