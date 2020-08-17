import React, { useState, useEffect } from 'react';
import { geoLocation, NearbySearch } from './shared/geoLoc';

function App() {
	const [ addresses, setAddresses ] = useState([
		{
			name: 'Ktx khu B',
			address: 'Ho Chi Minh'
		},
		{
			name: 'Ktx khu D@',
			address: 'Ho Chi Minh'
		}
	]);

	var map;

	useEffect(() => {
		new window.google.maps.Map(document.getElementById('map'), {
			center: {
				lat: -34.397,
				lng: 150.644
			},
			zoom: 15
		});
	}, []);

	async function fetchData({ keys }) {
		const position = await geoLocation();
		const fetchNearBySearch = await NearbySearch({ map, position, query: keys });

		setTimeout(() => {
			setAddresses([ ...fetchNearBySearch ]);
		}, 2000);
	}

	var pullData = addresses.map((element, index) => {
		return (
			<div key={index} className='card'>
				<h4 className='card__heading'>{element.name}</h4>
				<div className='card__details'>
					<ul className='card__list'>
						<li className='card__item'>{element.address}</li>
					</ul>
				</div>
			</div>
		);
	});

	return (
		<React.Fragment>
			<header className='header'>
				<div className='header__text-box'>
					<h1 className='heading-primary'>
						<span className='heading-primary--main'>Map footer</span>
						<span className='heading-primary--sub'>Bringing everyone together</span>
					</h1>
				</div>
			</header>

			<main>
				<section className='section-book'>
					<div className='book'>
						<ul className='book__list'>
							<li onClick={() => fetchData({ keys: 'coffee' })} className='book__item'>
								<a href=' #' className='book__link'>
									Coffee
								</a>
							</li>
							<li onClick={() => fetchData({ keys: 'nhà hàng' })} className='book__item'>
								<a href=' #' className='book__link'>
									Nhà Hàng
								</a>
							</li>
							<li onClick={() => fetchData({ keys: 'bách hóa' })} className='book__item'>
								<a href=' #' className='book__link'>
									Bách Hóa
								</a>
							</li>
							<li onClick={() => fetchData({ keys: 'tiệm thuốc' })} className='book__item'>
								<a href=' #' className='book__link'>
									Tiệm Thuốc
								</a>
							</li>
						</ul>
					</div>
				</section>

				<section className='section-listaddress'>{pullData}</section>

				<section className='section-displaymap'>
					<div id='map' />
				</section>
				<section className='footer'>
					<div className='row'>
						<div className='footer__navigation'>
							<ul className='footer__list'>
								<li className='footer__item'>
									<a href='#' className='footer__link'>
										Company
									</a>
								</li>
								<li className='footer__item'>
									<a href='#' className='footer__link'>
										Contact us
									</a>
								</li>
								<li className='footer__item'>
									<a href='#' className='footer__link'>
										Carrers
									</a>
								</li>
								<li className='footer__item'>
									<a href='#' className='footer__link'>
										Privacy policy
									</a>
								</li>
								<li className='footer__item'>
									<a href='#' className='footer__link'>
										Terms
									</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</main>
		</React.Fragment>
	);
}

export default App;
