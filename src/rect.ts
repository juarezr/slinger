/// <reference path="common.ts" />
/// <reference path="point.ts" />
/// <reference path="math.ts" />
module Rect {
	export function copy(r: Rect): Rect {
		return { pos: Point.copy(r.pos), size: Point.copy(r.size) };
	}

	export function closestCorner(r: Rect, p: Point): Anchor {
		const pow = Math.pow;
		const sqrt = Math.sqrt;
		const near = r.pos;
		const far = { x: r.pos.x + r.size.x, y: r.pos.y + r.size.y };
		const tl = sqrt(pow(p.x - near.x, 2) + pow(p.y - near.y, 2));
		const tr = sqrt(pow(p.x -  far.x, 2) + pow(p.y - near.y, 2));
		const br = sqrt(pow(p.x -  far.x, 2) + pow(p.y -  far.y, 2));
		const bl = sqrt(pow(p.x - near.x, 2) + pow(p.y -  far.y, 2));
		const corners = [tl, tr, bl, br];
		// log("Closest corners: " + JSON.stringify(corners));
		corners.sort(function(a,b) { return a - b });
		// log("Closest corners (sorted): " + JSON.stringify(corners));
		const min = corners[0];
		if (min == tl) return Anchor.TOPLEFT;
		if (min == tr) return Anchor.TOPRIGHT;
		if (min == br) return Anchor.BOTTOMRIGHT;
		return Anchor.BOTTOMLEFT;
	}

	export function move(r: Rect, p: Point): Rect {
		return {
			pos: Point.add(r.pos, p),
			size: r.size
		}
	}

	export function moveWithin(rect: Rect, bounds: Rect): Rect {
		const r = copy(rect);
		if (r.size.x > bounds.size.x) r.size.x = bounds.size.x;
		if (r.size.y > bounds.size.y) r.size.y = bounds.size.y;

		r.pos.x = MathUtil.between(bounds.pos.x, r.pos.x, (bounds.pos.x + bounds.size.x - r.size.x));
		r.pos.y = MathUtil.between(bounds.pos.y, r.pos.y, (bounds.pos.y + bounds.size.y - r.size.y));
		return r;
	}

	export function midpoint(rect: Rect): Point {
		return Point.add(rect.pos, Point.scaleConstant(0.5, rect.size));
	}
}
