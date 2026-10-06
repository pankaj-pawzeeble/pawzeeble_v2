// @ts-nocheck
/* eslint-disable */
/**
 * Base class for SiteController. Provides renderVals() through SiteContext and keeps
 * the controller's `page` state in sync with the Next.js router in both directions.
 */
import React from 'react';
import Router from 'next/router';
import { SiteContext } from './SiteContext';
import { routeFor, urlForState } from '@/utils/routes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DCLogic extends React.Component<any, any> {
  renderVals() {
    return {};
  }

  render() {
    return React.createElement(SiteContext.Provider, { value: this.renderVals() }, this.props.children);
  }

  setState(update, callback) {
    super.setState(update, callback);
    if (this._syncing || typeof window === 'undefined') return;
    if (update && typeof update === 'object' && 'page' in update) {
      const url = urlForState({ ...this.state, ...update });
      if (url !== Router.asPath) Router.push(url, undefined, { scroll: false });
    }
  }

  /** Router → state: back/forward buttons and direct links. */
  _syncRoute(prevProps) {
    if (!prevProps || prevProps.routeKey === this.props.routeKey) return;
    const r = this.props.routeState || {};
    this._syncing = true;
    try {
      if (r.page && routeFor(r.page) !== routeFor(this.state.page)) this.go(r.page)();
      const extra = {};
      if (r.blogPost != null && r.blogPost !== this.state.blogPost) extra.blogPost = r.blogPost;
      if (r.clinicType && r.clinicType !== this.state.clinicType) extra.clinicType = r.clinicType;
      if (Object.keys(extra).length) this.setState(extra);
    } finally {
      this._syncing = false;
    }
  }
}
