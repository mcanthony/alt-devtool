import { Column, Table } from 'fixed-data-table'
import Data from './Data.jsx'
import DevActions from '../actions/DevActions'
import FauxTable from './FauxTable.jsx'
import React from 'react'

class DispatcherView extends React.Component {
  constructor() {
    super()

    this.state = {
      height: 300,
      width: 300
    }
  }

  componentDidMount() {
    const table = React.findDOMNode(this.refs.table)
    this.setState({
      height: window.innerHeight - 60, // 60 is tabs + filter panel
      width: table.clientWidth - 6 // 6 is some magic number
    })
  }

  clearDispatches() {
    DevActions.clearDispatches()
  }

  doSearch(ev) {
    DevActions.search(ev.target.value)
  }

  highlightColumn(x, id, data) {
    const node = x || 'N/A'
    return data[2] === this.props.selectedPayload
      ? <div style={{ background: '#70bde6' }}>{node}</div>
      : node
  }

  selectRow(ev, id, rowData) {
    DevActions.selectRow(rowData[2])
  }

  toggleLogDispatch() {
    DevActions.toggleLogDispatch()
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col c6">
            <input
              onChange={this.doSearch}
              placeholder="Filter dispatches"
              style={{ width: '100%' }}
              type="text"
              value={this.props.searchValue}
            />
          </div>
          <div className="col c6" style={{ lineHeight: '34px' }}>
            <i
              className="fa fa-ban"
              onClick={this.clearDispatches}
              style={{ margin: '0 1em' }}
              title="Clear Dispatches"
            />
            <label className="inline" style={{ margin: '0' }}>
              <input
                checked={this.props.logDispatches}
                onChange={this.toggleLogDispatch}
                type="checkbox"
              />
              {' '}
              Log Dispatches
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col c6" ref="table">
            <Table
              headerHeight={20}
              height={this.state.height}
              onRowClick={this.selectRow}
              rowGetter={(idx) => this.props.dispatches[idx]}
              rowHeight={35}
              rowsCount={this.props.dispatches.length}
              width={this.state.width}
            >
              <Column
                cellRenderer={this.highlightColumn.bind(this)}
                dataKey={0}
                label="Name"
                width={this.state.width / 2}
              />
              <Column
                cellRenderer={this.highlightColumn.bind(this)}
                dataKey={1}
                label="Stores"
                width={this.state.width / 2}
              />
            </Table>
          </div>
          <div className="col c6">
            <FauxTable title="Payload" height={this.state.height}>
              <Data data={this.props.selectedPayload} />
            </FauxTable>
          </div>
        </div>
      </div>
    )
  }
}

export default DispatcherView
