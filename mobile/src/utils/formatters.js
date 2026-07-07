import moment from 'moment';
import { DISTANCE_UNIT } from './constants';

export const formatCurrency = (amount, currency = '$') => {
  return `${currency}${parseFloat(amount).toFixed(2)}`;
};

export const formatDate = (date, format = 'MMM DD, YYYY') => {
  return moment(date).format(format);
};

export const formatTime = (time, format = 'hh:mm A') => {
  return moment(time).format(format);
};

export const formatDateTime = (dateTime, format = 'MMM DD, YYYY hh:mm A') => {
  return moment(dateTime).format(format);
};

export const formatDistance = (distance) => {
  return `${parseFloat(distance).toFixed(1)} ${DISTANCE_UNIT}`;
};

export const formatRating = (rating) => {
  return parseFloat(rating).toFixed(1);
};

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const truncateString = (str, length = 50) => {
  return str.length > length ? `${str.substring(0, length)}...` : str;
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getOrderStatusColor = (status) => {
  const statusColors = {
    pending: '#F39C12',
    confirmed: '#3498DB',
    preparing: '#9B59B6',
    ready: '#2ECC71',
    out_for_delivery: '#E67E22',
    delivered: '#27AE60',
    cancelled: '#E74C3C',
  };
  return statusColors[status] || '#95A5A6';
};

export const getTimeDifference = (date) => {
  return moment(date).fromNow();
};

export const calculateDeliveryTime = (estimatedTime) => {
  const now = moment();
  const delivery = moment(estimatedTime);
  return delivery.diff(now, 'minutes');
};
