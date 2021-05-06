import Vue from "vue";
import lang from "element-ui/lib/locale/lang/ca";
import locale from "element-ui/lib/locale";
import {
  Button,
  Container,
  Header,
  Footer,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Carousel,
  CarouselItem,
  Table,
  TableColumn,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Aside,
  MenuItemGroup,
  Pagination,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  Message,
  Dialog,
  MessageBox,
  Image,
  Card,
  Divider,
  Row,
  Col

} from "element-ui";

locale.use(lang);
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Aside);
Vue.use(MenuItemGroup);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Option);
Vue.use(Input);
Vue.use(Select);
Vue.use(Dialog);
Vue.use(Image)
Vue.use(Card);
Vue.use(Divider)
Vue.use(Row)
Vue.use(Col)
