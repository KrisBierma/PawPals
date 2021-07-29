// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import "../styles/LandingPage.css";
import petBannerImage from '../assets/images/paw_pals_banner_mascots.jpg';

export default function LandingPage() {
	return (
		<div>
			<img src={petBannerImage} alt="cat and pug sitting" className="d-block w-100" />
			<div className="container landing-page-main text-justify">

				<div>
					<center><h4>Adoption Process</h4></center>					
					<ol>
						<li>We ask that you spend at least 30 minutes with the cat or dog you want to adopt. Please plan on spending more time to fully complete the adoption process.</li>
						<li >You must be at least 18 years of age to adopt a pet.</li>
						<li>Fill out our adoption application and meet with an adoption counselor.</li>
					</ol>
				</div>


				<div>
					<center><h4>Requirements</h4></center>					
					<ol>
						<li>There are no additional fees besides the adoption fee.</li>
						<li>All dogs and cats are neutered or spayed upon arrival.</li>
						<li>If you need advice to help your pet get used to their new home, please do not hesitate to contact us. We have several animal behaviors specialists that will be more than happy to assist.</li>
					</ol>
				</div>


				<div>
					<center><h4>About our animals</h4></center>					
					<ol>
						<li>All of our animals spend several weeks getting used to being around other pets.</li>
						<li>Most dogs go through a four week training course that helps them learn basic commands such as sit, stay and come.</li>
					</ol>
				</div>


				<div>
					<center><h4>Volunteer</h4></center>					
					<ol>
						<p>Our animals love visits and having people drop by to spend
							time with them helps them in getting adopted faster. Feel free
							to stop by any time during work hours to visit us.
						</p>
						
					</ol>
				</div>





			</div>
		</div>

	)
}