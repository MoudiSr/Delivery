import React from "react"

export default function NavBar({children, className, style}) {
	return (
		<nav className={className} style={style}>
			{children}
		</nav>
	)
}