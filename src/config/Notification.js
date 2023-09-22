import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";

export const REFRESH_INTERVAL = 1000 * 60 * 1; // 1 minute
export const NUMBER_OF_NOTIFICATIONS_TO_SHOW = 5;
export const NOTIFICATION_URL = "/api/notifications";
export const NOTIFICATION_DROPDOWN_TITLE = "Your Notifications";
export const NOTIFICATION_DROPDOWN_BROADCAST = "Broadcast Notifications";
export const NOTIFICATION_DROPDOWN_ITEM_IMAGE_CLASS = "rounded-full w-11 h-11";
export const NOTIFICATION_DROPDOWN_ITEM_IMAGE_WIDTH = 44;
export const NOTIFICATION_DROPDOWN_ITEM_IMAGE_HEIGHT = 44;

export const NOTIFICATION_IMAGE_URL = "/images.jpg";
export const NOTIFICATION_DROPDOWN_ITEM_CLASS =
  "flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700";
export const NOTIFICATION_DROPDOWN_ITEM_TEXT_CLASS =
  "flex flex-col ml-4 justify-center";
export const NOTIFICATION_DROPDOWN_ITEM_TEXT_TITLE_CLASS =
  "text-sm font-medium text-gray-600 dark:text-gray-200";

export const NOTIFICATION_DROPDOWN_INTERVAL = 1000; // 1 second
