import { FaHome } from 'react-icons/fa';
import { MdQueryStats } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoBarChartSharp } from 'react-icons/io5';
import { FaWpforms } from 'react-icons/fa';
import { MdManageAccounts } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';

const links = [
    {
        id: 1,
        text: 'home',
        path: '/',
        icon: <FaHome />,
    },
    {
        id: 2,
        text: 'multi date picker',
        path: 'multi-date-picker',
        icon: <FaCalendarAlt />,
    },
    {
        id: 3,
        text: 'reports',
        path: 'reports',
        icon: <IoBarChartSharp />,
    },
    {
        id: 4,
        text: 'profile',
        path: 'profile',
        icon: <MdManageAccounts />,
    },
];

export default links;