
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import React, {Component} from 'react';

class IconsTable extends Component{

    static getIconsTable(){
      return  {
          Add: AddBox,
          Check: Check,
          Clear: Clear,
          Delete: DeleteOutline,
          DetailPanel: ChevronRight,
          Edit: Edit,
          Export: SaveAlt,
          Filter: FilterList,
          FirstPage: FirstPage,
          LastPage: LastPage,
          NextPage: ChevronRight,
          PreviousPage: ChevronLeft,
          ResetSearch: Clear,
          Search: Search,
          SortArrow: ArrowUpward,
          ThirdStateCheck: Remove,
          ViewColumn: ViewColumn
      };
    }
}

export default IconsTable;