export const environment = {
  production: true,
  API_Url: (window as { [key: string]: any })["env"]["API_Url"] || "default/",
  AUTH_Url: (window as { [key: string]: any })["env"]["AUTH_Url"] || "default/"
};
