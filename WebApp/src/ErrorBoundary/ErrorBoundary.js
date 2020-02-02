import React from 'react';
import ErrorDisplay from '../ErrorDisplay'

class ErrorBoundary extends React.Component{

    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null};
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <ErrorDisplay onRefresh = {() => this.setState({hasError: false, error: null})} error = {this.state.error} />
        }

        return this.props.children; 
  }
}

export default ErrorBoundary;