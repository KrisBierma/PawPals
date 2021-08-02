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
					<ul>
					    <li>Thank you for your interest in adopting a new family member.</li><br />
						<li>After browsing through the list of available pets, please note the name of the one(s) you are interested in prior to contacting us.</li><br />
						<li>Once you are ready to adopt, you will be given an application to fill out while we get your new pet ready to go home.</li>
					</ul>
				</div>


				<div>
					<center><h4>Requirements</h4></center>
					<ol>
						<li>We ask that you spend at least 30 minutes with the cat or dog you want to adopt. Please plan on spending more time to fully complete the adoption process.</li><br />
						<li>You must be at least 18 years of age to adopt a pet.</li><br />
						<li>Prior to leaving the shelter you must meet with an adoption counselor for a short 15 minute session.</li>
					</ol>					
				</div>


				<div>
					<center><h4>About our animals</h4></center>					
					<ul>
					    <li>If you need advice to help your pet get used to their new home, please do not hesitate to contact us. We have several animal behaviors specialists that will be more than happy to assist.</li><br />
						<li>All of our animals spend several weeks getting used to being around other pets.</li><br />						
						<li>All dogs and cats are neutered or spayed upon arrival.</li>
					</ul>
				</div>


				<div>
					<center><h4>Volunteer</h4></center>					
					<ol>
						<p>Our animals love visits and having people drop by to spend
							time with them helps them in getting adopted faster. Feel free
							to stop by any time during work hours to visit us.
						</p>
						<p>Most dogs go through a four week training course that helps them learn basic commands such as sit, stay and come. 
							Having volunteers dropping by to assist with training is a great way to help our furry friends
							increase their chance of finding a home.</p>						
					</ol>
				</div>
			</div>
		</div>

	)
}