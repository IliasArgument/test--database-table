import React from "react";
import ReactPaginate from "react-paginate";
import Weather from "./Link/weather";
import DetailsRow from "./DetailsRow/detailsRow";
import ModeSelector from "./ModeSelector/modeSelector";
import Tablesearch from "./TableSearch/TableSearch";
import Loader from "./Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";



class App extends React.Component {
  state = {
    isModalSelected: false,
    date: [],
    isLoading: false,
    sort: "ask",
    sortField: "id",
    row: null,
    currentPage: 0,
    search: "",
  };

  async fetchData(url) {
    const response = await fetch(url);

    const date = await response.json();

    this.setState({
      date: _.orderBy(date, this.state.sortField, this.state.sort),
      isLoading: false,
    });
  }

  onSort = (sortField) => {
    const cloneData = this.state.date.concat();
    const sort = this.state.sort === "ask" ? "desc" : "ask";
    const date = _.orderBy(cloneData, sortField, sort);

    this.setState({ date, sort, sortField });
  };

  onRowSelect = (row) => {
    this.setState({
      row,
    });
  };

  onSelectAd = (url) => {
    this.setState({
      isLoading: true,
      isModalSelected: true,
    });
    this.fetchData(url);
  };

  handlePageClick = ({ selected }) => {
    this.setState({
      currentPage: selected,
    });
  };
  searchPost = (search) => {
    this.setState({
      search,
      currentPage: 0,
    });
  };

  getFilteredData() {
    const { date, search } = this.state;
    if (!search) {
      return date;
    }
    return date.filter((item) => {
      return (
        item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
        item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
        item["email"].toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  render() {
    const page = 50;

    if (!this.state.isModalSelected) {
      return (
        <div className="container">
          <ModeSelector onSelect={this.onSelectAd} />
        </div>
      );
    }
    const filteredData = this.getFilteredData();
    const methodChunk = _.chunk(filteredData, page)[this.state.currentPage];
    return (
      <div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Tablesearch onSearchItem={this.searchPost} />
            <Weather
              date={methodChunk}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.sortField}
              onRowSelect={this.onRowSelect}
            />
          </React.Fragment>
        )}
        {this.state.date.length > page ? (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={20}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            forsePage={this.state.currentPage}
          />
        ) : null}
        {this.state.row ? <DetailsRow person={this.state.row} /> : null}
      </div>
    );
  }
}

export default App;
