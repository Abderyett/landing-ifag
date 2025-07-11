import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { Calendar, MapPin, Users, BookOpen, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';

export default function JourneePortesOuvertes() {
	const [formData, setFormData] = useState({
		nomPrenom: '',
		email: '',
		mobile: '',
		source: 'jpo12',
		anneeDuBac: '',
		specialite: '',
		programme: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(
		null
	);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async () => {
		// Validation
		if (
			!formData.nomPrenom ||
			!formData.email ||
			!formData.mobile ||
			!formData.anneeDuBac ||
			!formData.programme
		) {
			setSubmitStatus({ type: 'error', message: 'Veuillez remplir tous les champs obligatoires' });
			return;
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			setSubmitStatus({ type: 'error', message: 'Veuillez entrer une adresse email valide' });
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			const response = await fetch('https://ifag-jpo.vispera-dz.com/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (response.ok) {
				setSubmitStatus({ type: 'success', message: 'Votre inscription a été envoyée avec succès!' });
				setFormData({
					nomPrenom: '',
					email: '',
					mobile: '',
					source: 'JPO 12',
					anneeDuBac: '',
					specialite: '',
					programme: '',
				});
			} else {
				setSubmitStatus({ type: 'error', message: result.error || "Erreur lors de l'envoi" });
			}
		} catch (error) {
			console.error("Erreur lors de l'envoi:", error);
			setSubmitStatus({
				type: 'error',
				message: 'Erreur de connexion au serveur. Vérifiez que le serveur est démarré.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100'>
			{/* Hero Section */}
			<div className='relative overflow-hidden bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white'>
				<div className='absolute inset-0 bg-black/65'></div>
				<div className='absolute inset-0'>
					<img
						src='/campus1.jpg'
						alt='IFAG Campus from Highway'
						className='w-full h-full object-cover object-center opacity-35'
					/>
				</div>
				<div className='relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-24'>
					<div className='text-center'>
						<div className='flex justify-center mb-6'>
							<div className='bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20'>
								<div className='flex justify-center'>
									<img
										src='/ifag-logo.svg'
										alt='IFAG Higher Institute Logo'
										className='w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-24 drop-shadow-lg'
									/>
								</div>
							</div>
						</div>

						<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2 drop-shadow-lg'>
							Journée Portes Ouvertes
						</h1>
						<p className='text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-95 max-w-3xl mx-auto px-2 drop-shadow-md'>
							Découvrez l'IFAG et ses Licences d'excellence dans un cadre moderne et dynamique
						</p>

						{/* IFAG Description */}
						<div className='bg-white/15 backdrop-blur-md rounded-xl p-4 sm:p-6 mb-8 sm:mb-12 max-w-4xl mx-auto mx-2 border border-white/20'>
							<div className='text-center mb-4'>
								<p
									className='text-sm sm:text-base md:text-lg text-white/98 leading-relaxed mb-2 sm:mb-3 drop-shadow-md'
									dir='rtl'>
									معتمدة من طرف وزارة التعليم العالي والبحث العلمي
								</p>
								<p className='text-sm sm:text-base md:text-lg text-white/98 leading-relaxed drop-shadow-md'>
									Agréé par le Ministère de l'Enseignement Supérieur et de la Recherche Scientifique (Arrêté
									N847° du 30 octobre 2022)
								</p>
							</div>
						</div>

						<div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-8 mb-8 sm:mb-12 text-sm sm:text-base md:text-lg px-2'>
							<div className='flex items-center gap-2 sm:gap-3 bg-white/15 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto justify-center border border-white/20'>
								<Calendar className='h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6' />
								<span className='font-semibold text-center drop-shadow-sm'>Samedi 12 juillet 2025</span>
							</div>
							<div className='flex items-center gap-2 sm:gap-3 bg-white/15 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto justify-center border border-white/20'>
								<span className='font-semibold drop-shadow-sm'>09h00 - 17h00</span>
							</div>
							<div
								className='flex items-center gap-2 sm:gap-3 bg-white/15 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto justify-center border border-white/20 cursor-pointer hover:bg-white/25 transition-all duration-300'
								onClick={() => window.open('https://maps.app.goo.gl/XPgAb1WatXidSJ1S8', '_blank')}>
								<MapPin className='h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6' />
								<span className='font-semibold text-center drop-shadow-sm'>Campus IFAG, Alger</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Form Section - Moved to second position */}
			<div className='relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-red-50/30 to-pink-50/30'>
				<div
					style={{
						backgroundImage:
							"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
					}}
					className='absolute inset-0'
				/>

				<div className='relative max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'>
					<Card className='shadow-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden'>
						<CardHeader className='text-center pb-6 sm:pb-8 bg-gradient-to-r from-red-500 to-pink-500 text-white pt-6 sm:pt-8 -mx-6 -mt-6 mb-0 px-6 rounded-t-lg'>
							<div className='flex justify-center mb-3 sm:mb-4'>
								<div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center'>
									<Calendar className='h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white' />
								</div>
							</div>
							<CardTitle className='text-xl sm:text-2xl md:text-3xl font-bold mb-2 px-2'>
								Réservez votre place
							</CardTitle>
							<CardDescription className='text-base sm:text-lg text-white/90 px-2'>
								Inscrivez-vous à la Journée Portes Ouvertes de l'IFAG
							</CardDescription>
						</CardHeader>

						<CardContent className='px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-6 sm:pt-8'>
							<div className='space-y-4 sm:space-y-6'>
								{/* Personal Information */}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
									<div className='space-y-2'>
										<Label htmlFor='nomPrenom' className='text-sm font-medium'>
											Nom et Prénom *
										</Label>
										<Input
											id='nomPrenom'
											type='text'
											value={formData.nomPrenom}
											onChange={(e) => handleInputChange('nomPrenom', e.target.value)}
											className='h-10 sm:h-12 text-sm sm:text-base'
											placeholder='Entrez votre nom et prénom'
											required
										/>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='email' className='text-sm font-medium'>
											Email *
										</Label>
										<Input
											id='email'
											type='email'
											value={formData.email}
											onChange={(e) => handleInputChange('email', e.target.value)}
											className='h-10 sm:h-12 text-sm sm:text-base'
											placeholder='exemple@gmail.com'
											required
										/>
									</div>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
									<div className='space-y-2'>
										<Label htmlFor='mobile' className='text-sm font-medium'>
											Numéro de téléphone *
										</Label>
										<Input
											id='mobile'
											type='tel'
											value={formData.mobile}
											onChange={(e) => handleInputChange('mobile', e.target.value)}
											className='h-10 sm:h-12 text-sm sm:text-base'
											placeholder='0550 xx xx xx'
											required
										/>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='anneeDuBac' className='text-sm font-medium'>
											Année du bac *
										</Label>
										<Input
											id='anneeDuBac'
											type='number'
											value={formData.anneeDuBac}
											onChange={(e) => handleInputChange('anneeDuBac', e.target.value)}
											className='h-10 sm:h-12 text-sm sm:text-base'
											placeholder='2024'
											required
										/>
									</div>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='specialite' className='text-sm font-medium'>
										Spécialité du bac
									</Label>
									<Select
										value={formData.specialite}
										onValueChange={(value) => handleInputChange('specialite', value)}>
										<SelectTrigger className='h-10 sm:h-12 text-sm sm:text-base w-full'>
											<SelectValue placeholder='Sélectionnez votre spécialité' />
										</SelectTrigger>
										<SelectContent className='w-full'>
											<SelectItem value='Scientifiques'>Scientifiques</SelectItem>
											<SelectItem value='BAC Français'>BAC Français</SelectItem>
											<SelectItem value='Maths'>Maths</SelectItem>
											<SelectItem value='Maths Technique'>Maths Technique</SelectItem>
											<SelectItem value='Gestion'>Gestion</SelectItem>
											<SelectItem value='Langues Étrangères'>Langues Étrangères</SelectItem>
											<SelectItem value='Lettres et Philosophie'>Lettres et Philosophie</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* Program Selection */}
								<div className='space-y-2'>
									<Label htmlFor='programme' className='text-sm font-medium'>
										Spécialité demandée *
									</Label>
									<Select
										value={formData.programme}
										onValueChange={(value) => handleInputChange('programme', value)}>
										<SelectTrigger className='h-10 sm:h-12 text-sm sm:text-base w-full'>
											<SelectValue placeholder='Sélectionnez une spécialité' />
										</SelectTrigger>
										<SelectContent className='w-full'>
											<SelectItem value='Licence Commerce & Marketing'>
												Licence Commerce & Marketing
											</SelectItem>
											<SelectItem value='Licence Finance & Comptabilité'>
												Licence Finance & Comptabilité
											</SelectItem>
											<SelectItem value='Licence Informatique'>Licence Informatique</SelectItem>
											<SelectItem value='Master Marketing Management'>Master Marketing Management</SelectItem>
											<SelectItem value='Master Transformation Digital & E-business'>
												Master Transformation Digital & E-business
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* Submit Status */}
								{submitStatus && (
									<Alert
										className={
											submitStatus.type === 'success'
												? 'border-green-200 bg-green-50'
												: 'border-red-200 bg-red-50'
										}>
										{submitStatus.type === 'success' ? (
											<CheckCircle className='h-4 w-4 text-green-600' />
										) : (
											<AlertCircle className='h-4 w-4 text-red-600' />
										)}
										<AlertDescription
											className={submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}>
											{submitStatus.message}
										</AlertDescription>
									</Alert>
								)}

								{/* Submit Button */}
								<Button
									type='button'
									onClick={handleSubmit}
									disabled={isSubmitting}
									className='w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg'>
									{isSubmitting ? (
										<>
											<div className='animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3'></div>
											<span className='text-sm sm:text-base'>Envoi en cours...</span>
										</>
									) : (
										<>
											<Calendar className='h-4 w-4 sm:h-5 sm:w-5 mr-2' />
											<span className='text-sm sm:text-base'>Réserver ma place à l'IFAG</span>
										</>
									)}
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Features Section - Outside form but inside same background container */}
				<div className='relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto'>
						<Card className='bg-white/90 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105'>
							<CardContent className='p-6 sm:p-8 text-center'>
								<div className='bg-red-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6'>
									<Users className='h-8 w-8 sm:h-10 sm:w-10 text-red-600' />
								</div>
								<h3 className='text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900'>
									Rencontrez l'équipe
								</h3>
								<p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
									Échangez avec nos professeurs expérimentés et nos étudiants passionnés
								</p>
							</CardContent>
						</Card>

						<Card className='bg-white/90 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105'>
							<CardContent className='p-6 sm:p-8 text-center'>
								<div className='bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6'>
									<BookOpen className='h-8 w-8 sm:h-10 sm:w-10 text-blue-600' />
								</div>
								<h3 className='text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900'>
									Programmes innovants
								</h3>
								<p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
									Découvrez nos formations en Sciences Commerciales, Marketing, Informatique et Management
								</p>
							</CardContent>
						</Card>

						<Card className='bg-white/90 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 sm:col-span-2 lg:col-span-1'>
							<CardContent className='p-6 sm:p-8 text-center'>
								<div className='bg-green-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6'>
									<MapPin className='h-8 w-8 sm:h-10 sm:w-10 text-green-600' />
								</div>
								<h3 className='text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900'>Infrastructure d'excellence</h3>
								<p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
									Visitez nos installations de pointe et découvrez notre environnement d'apprentissage
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Campus Showcase Section with Real IFAG Photos */}
			<div className='py-12 sm:py-16 md:py-20 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'>
					<div className='text-center mb-8 sm:mb-12 md:mb-16'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2'>
							Notre Campus IFAG
						</h2>
						<p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2'>
							Découvrez nos installations de pointe et notre environnement d'apprentissage exceptionnel
						</p>
					</div>

					{/* IFAG Campus Photos */}
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16'>
						{/* First Image - IFAG Logo Close-up */}
						<Card
							className='border-0 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-shadow duration-300'
							onClick={() => window.open('https://g.co/kgs/GWmUECt', '_blank')}>
							<CardContent
								className='p-0 cursor-pointer'
								onClick={() => window.open('https://g.co/kgs/GWmUECt', '_blank')}>
								<div
									className='relative h-60 sm:h-72 md:h-80 overflow-hidden group'
									onClick={() => window.open('https://g.co/kgs/GWmUECt', '_blank')}>
									<img
										src='/campus2.png'
										alt='IFAG Campus Logo'
										className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
									/>
									<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300'></div>
									<div className='absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<MapPin className='h-4 w-4 sm:h-5 sm:w-5 text-red-600' />
									</div>
								</div>
								<div
									className='p-4 sm:p-6 bg-white cursor-pointer'
									onClick={() => window.open('https://g.co/kgs/GWmUECt', '_blank')}>
									<h4 className='text-lg sm:text-xl font-bold text-gray-900 mb-2'>IFAG Higher Institute</h4>
									<p className='text-sm sm:text-base text-gray-600'>
										Higher Institute - Établissement reconnu d'excellence
									</p>
									<div className='mt-2 sm:mt-3 flex items-center gap-2 text-xs sm:text-sm text-red-600'>
										<MapPin className='h-3 w-3 sm:h-4 sm:w-4' />
										<span>Cliquez pour voir l'emplacement</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Second Image - Full Campus Building */}
						<Card
							className='border-0 shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-shadow duration-300'
							onClick={() => window.open('https://g.co/kgs/GWmUECt', '_blank')}>
							<CardContent
								className='p-0 cursor-pointer'
								onClick={() => window.open('https://g.co/kgs/GWmUECt', '_blank')}>
								<div
									className='relative h-60 sm:h-72 md:h-80 overflow-hidden group'
									onClick={() => window.open('https://g.co/kgs/GWmUECt', '_blank')}>
									<img
										src='/campus1.jpg'
										alt='IFAG Campus Building'
										className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
									/>
									<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300'></div>
									<div className='absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<MapPin className='h-4 w-4 sm:h-5 sm:w-5 text-red-600' />
									</div>
								</div>
								<div
									className='p-4 sm:p-6 bg-white cursor-pointer'
									onClick={() => window.open('https://g.co/kgs/GWmUECt', '_blank')}>
									<h4 className='text-lg sm:text-xl font-bold text-gray-900 mb-2'>Campus Principal IFAG</h4>
									<p className='text-sm sm:text-base text-gray-600'>
										Établissement d'excellence avec toutes les spécialités d'enseignement supérieur
									</p>
									<div className='mt-2 sm:mt-3 flex items-center gap-2 text-xs sm:text-sm text-red-600'>
										<MapPin className='h-3 w-3 sm:h-4 sm:w-4' />
										<span>Cliquez pour voir l'emplacement</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Programs Grid */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto'>
						<Card className='border-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
							<CardContent className='p-4 sm:p-6 text-center'>
								<div className='w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4'>
									<BookOpen className='h-5 w-5 sm:h-6 sm:w-6 text-red-600' />
								</div>
								<h3 className='text-sm sm:text-base font-bold text-gray-900 mb-2'>
									Licence Commerce & Marketing
								</h3>
								<p className='text-xs sm:text-sm text-gray-600'>
									Formation complète en commerce et marketing
								</p>
							</CardContent>
						</Card>

						<Card className='border-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
							<CardContent className='p-4 sm:p-6 text-center'>
								<div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4'>
									<Users className='h-5 w-5 sm:h-6 sm:w-6 text-blue-600' />
								</div>
								<h3 className='text-sm sm:text-base font-bold text-gray-900 mb-2'>
									Licence Finance & Comptabilité
								</h3>
								<p className='text-xs sm:text-sm text-gray-600'>Expertise en finance et comptabilité</p>
							</CardContent>
						</Card>

						<Card className='border-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
							<CardContent className='p-4 sm:p-6 text-center'>
								<div className='w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4'>
									<BookOpen className='h-5 w-5 sm:h-6 sm:w-6 text-green-600' />
								</div>
								<h3 className='text-sm sm:text-base font-bold text-gray-900 mb-2'>Licence Informatique</h3>
								<p className='text-xs sm:text-sm text-gray-600'>Technologies avancées et développement</p>
							</CardContent>
						</Card>

						<Card className='border-0 shadow-lg hover:shadow-xl transition-shadow duration-300'>
							<CardContent className='p-4 sm:p-6 text-center'>
								<div className='w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4'>
									<Users className='h-5 w-5 sm:h-6 sm:w-6 text-purple-600' />
								</div>
								<h3 className='text-sm sm:text-base font-bold text-gray-900 mb-2'>
									Master Marketing Management
								</h3>
								<p className='text-xs sm:text-sm text-gray-600'>Leadership et gestion marketing</p>
							</CardContent>
						</Card>

						<Card className='border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1'>
							<CardContent className='p-4 sm:p-6 text-center'>
								<div className='w-10 h-10 sm:w-12 sm:h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4'>
									<BookOpen className='h-5 w-5 sm:h-6 sm:w-6 text-cyan-600' />
								</div>
								<h3 className='text-sm sm:text-base font-bold text-gray-900 mb-2'>
									Master Transformation Digital & E-business
								</h3>
								<p className='text-xs sm:text-sm text-gray-600'>Innovation numérique et e-commerce</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className='bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 sm:py-16'>
				<div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8'>
						<div className='md:col-span-2'>
							<div className='flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6'>
								<div className='w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-full flex items-center justify-center'>
									<span className='text-white font-bold text-base sm:text-lg'>IFAG</span>
								</div>
								<div>
									<h3 className='text-lg sm:text-xl font-bold'>IFAG Université Privée</h3>
									<p className='text-gray-400 text-sm sm:text-base'>
										Higher Institute - INSAG Education Group
									</p>
								</div>
							</div>
							<p className='text-gray-300 leading-relaxed mb-4 text-sm sm:text-base'>
								L'IFAG est un établissement privé d'enseignement supérieur reconnu, offrant des formations
								d'excellence en Sciences Commerciales, Marketing,Finance et Comptabilité, Informatique et
								Management.
							</p>
						</div>

						<div>
							<h3 className='text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-red-400'>Contact</h3>
							<div className='space-y-3 sm:space-y-4'>
								<div className='flex items-center gap-2 sm:gap-3'>
									<Phone className='h-4 w-4 sm:h-5 sm:w-5 text-red-400' />
									<span className='text-sm sm:text-base'>0770 251 855</span>
								</div>
								<div className='flex items-center gap-2 sm:gap-3'>
									<Mail className='h-4 w-4 sm:h-5 sm:w-5 text-red-400' />
									<span className='text-sm sm:text-base'>contact@insag.edu.dz</span>
								</div>
								<div className='flex items-center gap-2 sm:gap-3'>
									<MapPin className='h-4 w-4 sm:h-5 sm:w-5 text-red-400' />
									<span className='text-sm sm:text-base'>1 Rue Belle Vue, Lot Djnane Boursas, Hydra</span>
								</div>
							</div>
						</div>

						<div>
							<h3 className='text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-red-400'>
								Journée Portes Ouvertes
							</h3>
							<div className='space-y-3'>
								<div className='bg-red-500/20 rounded-lg p-3 sm:p-4 border border-red-500/30'>
									<div className='flex items-center gap-2 mb-2'>
										<Calendar className='h-3 w-3 sm:h-4 sm:w-4 text-red-400' />
										<span className='font-semibold text-sm sm:text-base'>Date</span>
									</div>
									<p className='text-sm sm:text-base'>Samedi 12 juillet 2025</p>
								</div>
								<div className='bg-red-500/20 rounded-lg p-3 sm:p-4 border border-red-500/30'>
									<div className='flex items-center gap-2 mb-2'>
										<span className='font-semibold text-sm sm:text-base'>Horaires</span>
									</div>
									<p className='text-sm sm:text-base'>09h00 - 17h00</p>
								</div>
							</div>
						</div>
					</div>

					<div className='border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8'>
						<div className='flex flex-col md:flex-row justify-between items-center'>
							<p className='text-gray-400 text-sm sm:text-base text-center md:text-left'>
								© 2025 IFAG. Tous droits réservés.
							</p>
							<div className='flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4 md:mt-0'>
								<span className='text-xs sm:text-sm text-gray-500'>Reconnu par le MESRS</span>
								<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full'></div>
								<span className='text-xs sm:text-sm text-gray-500'>Établissement Privé</span>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
