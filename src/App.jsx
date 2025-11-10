import React, { useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link, Outlet } from 'react-router-dom'

const buttonStyles = {
	primary:
		'inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black',
	secondary:
		'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900',
	ghost:
		'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-white hover:text-slate-900',
}

const Button = ({ variant = 'primary', className = '', children, ...props }) => (
	<button type="button" className={`${buttonStyles[variant]} ${className}`} {...props}>
		{children}
	</button>
)

const Input = ({ label, hint, className = '', ...props }) => (
	<label className={`block ${className}`}>
		<span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
		<input
			{...props}
			className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
		/>
		{hint ? <span className="mt-1 block text-xs text-slate-400">{hint}</span> : null}
	</label>
)

const TextArea = ({ label, hint, className = '', rows = 5, ...props }) => (
	<label className={`block ${className}`}>
		<span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
		<textarea
			rows={rows}
			{...props}
			className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
		/>
		{hint ? <span className="mt-1 block text-xs text-slate-400">{hint}</span> : null}
	</label>
)

const SectionCard = ({ title, description, children, footer }) => (
	<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
		<div className="flex flex-col gap-3">
			<div>
				<h3 className="text-lg font-semibold text-slate-900">{title}</h3>
				{description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
			</div>
			<div className="text-sm text-slate-600">{children}</div>
			{footer ? <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">{footer}</div> : null}
		</div>
	</section>
)

const SummaryCard = ({ title, value, unit, status, trend }) => (
	<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
		<p className="text-xs font-medium uppercase tracking-wide text-slate-400">{title}</p>
		<div className="mt-3 flex items-end gap-2">
			<span className="text-2xl font-semibold text-slate-900">{value}</span>
			{unit ? <span className="text-sm text-slate-500">{unit}</span> : null}
		</div>
		<div className="mt-3 flex items-center justify-between text-xs text-slate-500">
			<span>{status}</span>
			{trend ? <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-600">{trend}</span> : null}
		</div>
	</div>
)

const Header = () => {
	const menu = [
		{ label: '홈', to: '/', end: true },
		{ label: '입고', to: '/inbound' },
		{ label: '소모', to: '/consume' },
		{ label: '관리', to: '/manage' },
	]
	return (
		<header className="border-b border-slate-200 bg-white/90 backdrop-blur">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
				<Link to="/" className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg font-semibold text-white">
						AI
					</div>
					<div>
						<h1 className="text-lg font-semibold text-slate-900">AI 집사</h1>
						<p className="text-xs text-slate-500">My Personal Logistics ERP</p>
					</div>
				</Link>
				<nav className="hidden items-center gap-6 text-sm font-medium md:flex">
					{menu.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							end={item.end}
							className={({ isActive }) =>
								`transition ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>
			</div>
		</header>
	)
}

const Footer = () => (
	<footer className="border-t border-slate-200 bg-white/80">
		<div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
			<p>© {new Date().getFullYear()} AI 집사 Prototype</p>
			<div className="flex flex-wrap items-center gap-3">
				<a className="transition hover:text-slate-900" href="https://upstage.ai/" target="_blank" rel="noreferrer">
					Upstage AI
				</a>
				<a className="transition hover:text-slate-900" href="https://n8n.io/" target="_blank" rel="noreferrer">
					n8n
				</a>
				<a className="transition hover:text-slate-900" href="mailto:team@aibutler.dev">
					지원 문의
				</a>
			</div>
		</div>
	</footer>
)

const Layout = () => (
	<div className="min-h-screen bg-slate-100 text-slate-900">
		<Header />
		<main className="mx-auto max-w-6xl px-4 py-12">
			<Outlet />
		</main>
		<Footer />
	</div>
)

const Home = () => (
	<div className="space-y-12">
		<section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-white shadow-xl lg:px-12">
			<div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr,1.2fr]">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Personal Logistics</p>
					<h2 className="mt-4 text-3xl font-semibold leading-tight lg:text-4xl">
						나의 식료품과 생활용품, AI 집사가 자동으로 챙겨드립니다.
					</h2>
					<p className="mt-5 text-base text-slate-300">
						영수증 등록, 재고 차감, 쇼핑리스트 생성까지 모두 하나의 화면에서. 식료품과 세제·화장지 같은 생필품도 n8n
						Webhook과 연결하면 자동화가 바로 시작됩니다.
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<Link to="/inbound" className={buttonStyles.primary}>
							입고 등록하기
						</Link>
						<Link to="/consume" className={buttonStyles.ghost}>
							소모 기록 남기기
						</Link>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4">
					<SummaryCard title="현재 등록 품목" value="42" unit="items" status="지난 7일: +8" trend="재고 증가" />
					<SummaryCard title="임박 재고" value="3" unit="items" status="평균 유통기한 D-4" trend="주의 필요" />
					<SummaryCard title="이번 주 소비" value="18" unit="items" status="예산 대비 80%" trend="안정적" />
				</div>
			</div>
		</section>

		<section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<SectionCard title="입고" description="구매한 품목을 빠르게 등록하세요.">
				<div className="space-y-4">
					<p className="text-sm">영수증 업로드 또는 직접 입력으로 재고를 채워 넣습니다.</p>
					<div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
						- 이미지 업로드 → OCR → 항목 분류
						<br />- 식료품과 생활용품 모두 자동 추천
					</div>
					<Link to="/inbound" className={buttonStyles.primary}>
						입고 페이지 열기
					</Link>
				</div>
			</SectionCard>
			<SectionCard title="소모" description="만든 음식과 사용한 품목을 바로 차감합니다.">
				<div className="space-y-4">
					<p className="text-sm">요리명/상황만 남기면 필요한 재료·생활용품이 자동 차감됩니다.</p>
					<div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
						- 자주 쓰는 품목을 단일 클릭으로 차감
						<br />- 서빙 수에 맞게 양 자동 계산
					</div>
					<Link to="/consume" className={buttonStyles.primary}>
						소모 페이지 열기
					</Link>
				</div>
			</SectionCard>
			<SectionCard title="관리" description="재고 현황과 알람을 한 눈에 확인하세요.">
				<div className="space-y-4">
					<p className="text-sm">유통기한 임박 식품과 생활용품 재고 알림, 쇼핑리스트 제안을 관리합니다.</p>
					<div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
						- 재고 카드 & 소비 차트
						<br />- 쇼핑리스트 자동 생성
					</div>
					<Link to="/manage" className={buttonStyles.primary}>
						관리 페이지 열기
					</Link>
				</div>
			</SectionCard>
		</section>
	</div>
)

const Breadcrumb = ({ current }) => (
	<nav className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-500">
		<Link to="/" className="transition hover:text-slate-900">
			홈
		</Link>
		<span className="text-slate-400">/</span>
		<span className="text-slate-900">{current}</span>
	</nav>
)

const JsonPreview = ({ title, data }) => (
	<div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
		<div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</div>
		<pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-all text-xs text-slate-700">
			{JSON.stringify(data, null, 2)}
		</pre>
	</div>
)

const InboundPage = () => {
	const [store, setStore] = useState('이마트 성수점')
	const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0, 10))
	const [receiptMemo, setReceiptMemo] = useState('')
	const [notes, setNotes] = useState('')

	const payload = useMemo(
		() => ({
			type: 'inbound_receipt',
			store,
			purchase_date: purchaseDate,
			notes: notes || undefined,
			receipt_text: receiptMemo || undefined,
			items: [
				{ item_name: '우유', quantity: 2, unit: 'ea', expiry_date: '2025-02-02', category: '식료품' },
				{ item_name: '방울토마토', quantity: 1, unit: 'pack', expiry_date: '2025-01-29', category: '식료품' },
				{ item_name: '닭가슴살', quantity: 3, unit: 'pack', expiry_date: '2025-02-05', category: '식료품' },
				{ item_name: '세탁세제', quantity: 1, unit: 'bottle', expiry_date: null, category: '생활용품' },
			],
		}),
		[store, purchaseDate, notes, receiptMemo],
	)

	return (
		<div className="space-y-10">
			<Breadcrumb current="입고 등록" />

			<div className="rounded-3xl bg-white p-8 shadow-sm">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h2 className="text-2xl font-semibold text-slate-900">영수증으로 입고 등록</h2>
						<p className="mt-2 text-sm text-slate-500">
							영수증 사진을 업로드하거나 텍스트를 붙여넣으면 자동으로 품목이 등록됩니다. 연결된 n8n 워크플로에서 재고
							데이터베이스로 전송하세요.
						</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button variant="secondary">영수증 사진 업로드</Button>
						<Button>등록 요청 보내기</Button>
					</div>
				</div>

				<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr,1fr]">
					<div className="space-y-6">
						<SectionCard title="구매 정보">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<Input label="구매 매장" value={store} onChange={(e) => setStore(e.target.value)} />
								<Input
									type="date"
									label="구매 일자"
									value={purchaseDate}
									onChange={(e) => setPurchaseDate(e.target.value)}
								/>
							</div>
							<TextArea
								className="mt-4"
								label="메모 (선택)"
								placeholder="예: 이번 주 장보기 / 공동구매 등"
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
							/>
						</SectionCard>

						<SectionCard title="영수증 텍스트 붙여넣기" description="OCR 결과 또는 직접 입력">
							<TextArea
								rows={8}
								placeholder={'예) 우유 2개 3,800원\n방울토마토 1팩 4,200원\n닭가슴살 3팩 9,900원'}
								value={receiptMemo}
								onChange={(e) => setReceiptMemo(e.target.value)}
							/>
						</SectionCard>
						<SectionCard title="생활용품 즐겨찾기" description="자주 구매하는 생활용품을 빠르게 추가하세요.">
							<div className="flex flex-wrap gap-2">
								<Button variant="ghost">세탁세제 리필 추가</Button>
								<Button variant="ghost">주방세제 추가</Button>
								<Button variant="ghost">화장지 30롤 추가</Button>
								<Button variant="ghost">탈취제 추가</Button>
							</div>
						</SectionCard>
					</div>

					<div className="space-y-6">
						<SectionCard title="추출 예정 품목" description="AI가 분해한 품목을 확인하세요.">
							<div className="space-y-3 text-sm">
								<div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
									<div>
										<p className="font-medium text-slate-800">우유</p>
										<p className="text-xs text-slate-500">2개 · 유통기한 2025-02-02 · 식료품</p>
									</div>
									<Button variant="ghost">수정</Button>
								</div>
								<div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
									<div>
										<p className="font-medium text-slate-800">방울토마토</p>
										<p className="text-xs text-slate-500">1팩 · 유통기한 2025-01-29 · 식료품</p>
									</div>
									<Button variant="ghost">수정</Button>
								</div>
								<div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
									<div>
										<p className="font-medium text-slate-800">닭가슴살</p>
										<p className="text-xs text-slate-500">3팩 · 유통기한 2025-02-05 · 식료품</p>
									</div>
									<Button variant="ghost">수정</Button>
								</div>
								<div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
									<div>
										<p className="font-medium text-slate-800">세탁세제</p>
										<p className="text-xs text-slate-500">1통 · 생활용품 · 유통기한 없음</p>
									</div>
									<Button variant="ghost">수정</Button>
								</div>
								<Button variant="secondary" className="w-full">
									품목 직접 추가
								</Button>
							</div>
						</SectionCard>
						<JsonPreview title="Webhook 미리보기" data={payload} />
					</div>
				</div>
			</div>
		</div>
	)
}

const QuickSelect = ({ label, options, value, onChange }) => (
	<div>
		<div className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
		<div className="mt-3 flex flex-wrap gap-2">
			{options.map((option) => {
				const active = value === option
				return (
					<button
						type="button"
						key={option}
						onClick={() => onChange(option)}
						className={`rounded-full border px-4 py-2 text-xs transition ${
							active
								? 'border-slate-900 bg-slate-900 text-white'
								: 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
						}`}
					>
						{option}
					</button>
				)
			})}
		</div>
	</div>
)

const ConsumePage = () => {
	const [recipe, setRecipe] = useState('크림 파스타')
	const [servings, setServings] = useState('2')
	const [mood, setMood] = useState('집밥')
	const [memo, setMemo] = useState('')
	const [quickItem, setQuickItem] = useState('우유 1팩')

	const payload = useMemo(
		() => ({
			type: 'consume',
			recipe_name: recipe,
			servings: Number(servings || 0),
			context: mood,
			notes: memo || undefined,
			quick_item: quickItem,
			items: [
				{ item_name: '우유', quantity: 200, unit: 'ml' },
				{ item_name: '베이컨', quantity: 1, unit: 'pack' },
				{ item_name: '파스타면', quantity: 180, unit: 'g' },
				{ item_name: '주방세제', quantity: 10, unit: 'ml' },
			],
		}),
		[recipe, servings, mood, memo, quickItem],
	)

	return (
		<div className="space-y-10">
			<Breadcrumb current="소모 기록" />

			<div className="rounded-3xl bg-white p-8 shadow-sm">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h2 className="text-2xl font-semibold text-slate-900">오늘 사용한 재료 기록</h2>
						<p className="mt-2 text-sm text-slate-500">
							요리명과 인원수를 입력하면 필요한 재료가 자동 계산되어 재고가 차감됩니다. 빠른 차감 버튼으로 반복 사용
							품목도 쉽게 관리하세요.
						</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button variant="secondary">빠른 품목 차감</Button>
						<Button>소모 기록 전송</Button>
					</div>
				</div>

				<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr,1fr]">
					<div className="space-y-6">
						<SectionCard title="요리 정보">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<Input label="요리명" value={recipe} onChange={(e) => setRecipe(e.target.value)} />
								<Input
									label="인원수"
									type="number"
									min="1"
									value={servings}
									onChange={(e) => setServings(e.target.value)}
								/>
							</div>
							<TextArea
								className="mt-4"
								label="추가 메모 (선택)"
								placeholder="예: 친구와 저녁, 특별 메뉴 등"
								value={memo}
								onChange={(e) => setMemo(e.target.value)}
							/>
						</SectionCard>

						<SectionCard title="상황 선택" description="소비 패턴 분석을 위해 사용 목적을 선택해 주세요.">
							<QuickSelect
								label="사용 목적"
								options={['집밥', '회사 도시락', '모임/파티', '밀프렙', '생활용품 정리']}
								value={mood}
								onChange={setMood}
							/>
						</SectionCard>
					</div>

					<div className="space-y-6">
						<SectionCard title="빠른 차감 버튼">
							<QuickSelect
								label="자주 사용하는 품목"
								options={['우유 1팩', '계란 6개', '파스타면 200g', '쌀 1컵', '세탁세제 50ml']}
								value={quickItem}
								onChange={setQuickItem}
							/>
							<div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
								선택한 품목은 기록과 함께 차감됩니다. 필요 시 상세 항목에서 수량을 조정하세요.
							</div>
						</SectionCard>

						<JsonPreview title="차감 예정 목록" data={payload} />
					</div>
				</div>
			</div>
		</div>
	)
}

const ManagePage = () => {
	const soonExpire = [
		{ name: '요거트', dday: 2, quantity: '2개' },
		{ name: '방울토마토', dday: 3, quantity: '1팩' },
		{ name: '연어 스테이크', dday: 4, quantity: '2팩' },
	]

	const lowStock = [
		{ name: '올리브유', status: '5일 내 사용량 대비 부족', action: '쇼핑리스트 추가' },
		{ name: '그릭요거트', status: '1개 남음', action: '대체품 제안' },
		{ name: '화장지', status: '1주 사용분 남음', action: '벌크 구매 추천' },
	]

	const householdSnapshot = [
		{ name: '세탁세제', level: '70% 남음', nextBuy: '2주 후', tag: '생활용품' },
		{ name: '주방세제', level: '30% 남음', nextBuy: '다음 장보기 추천', tag: '생활용품' },
		{ name: '탈취제', level: '15% 남음', nextBuy: '이번 주 보충 필요', tag: '생활용품' },
	]

	return (
		<div className="space-y-10">
			<Breadcrumb current="재고 관리" />

			<div className="rounded-3xl bg-white p-8 shadow-sm">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h2 className="text-2xl font-semibold text-slate-900">재고 현황 대시보드</h2>
						<p className="mt-2 text-sm text-slate-500">
							유통기한 임박 품목과 부족 재고를 확인하고, AI가 제안하는 쇼핑리스트를 확인하세요. 버튼 클릭으로 n8n
							Webhook을 연결해 자동 알림을 받을 수 있습니다.
						</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button variant="secondary">유통기한 체크</Button>
						<Button>쇼핑리스트 업데이트</Button>
					</div>
				</div>

				<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
					<SummaryCard title="총 재고 품목" value="42" unit="items" status="지난주 대비 +4 (생활용품 +2)" trend="안정" />
					<SummaryCard title="임박 품목" value="3" unit="items" status="식품 2 · 생활용품 1" trend="주의" />
					<SummaryCard title="쇼핑리스트" value="6" unit="items" status="식품 3 · 생활용품 3" trend="업데이트됨" />
				</div>

				<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
					<SectionCard title="유통기한 임박">
						<ul className="space-y-3 text-sm">
							{soonExpire.map((item) => (
								<li
									key={item.name}
									className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800"
								>
									<div>
										<p className="font-semibold">{item.name}</p>
										<p className="text-xs text-amber-700">
											D-{item.dday} · {item.quantity}
										</p>
									</div>
									<Button variant="ghost">대체 레시피</Button>
								</li>
							))}
						</ul>
					</SectionCard>

					<SectionCard title="부족 재고 알림">
						<ul className="space-y-3 text-sm">
							{lowStock.map((item) => (
								<li
									key={item.name}
									className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
								>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-semibold text-slate-800">{item.name}</p>
											<p className="text-xs text-slate-500">{item.status}</p>
										</div>
										<Button variant="ghost">{item.action}</Button>
									</div>
								</li>
							))}
						</ul>
					</SectionCard>
				</div>

				<div className="mt-8">
					<SectionCard title="생활용품 재고 스냅샷" description="생활용품 소비 주기를 한눈에 확인하세요.">
						<ul className="space-y-3 text-sm">
							{householdSnapshot.map((item) => (
								<li
									key={item.name}
									className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
								>
									<div>
										<p className="font-semibold text-slate-800">
											{item.name}
											<span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
												{item.tag}
											</span>
										</p>
										<p className="text-xs text-slate-500">현재 잔량 {item.level}</p>
									</div>
									<div className="text-xs text-slate-500">다음 구매: {item.nextBuy}</div>
								</li>
							))}
						</ul>
					</SectionCard>
				</div>

				<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,1fr]">
					<SectionCard title="AI 제안 쇼핑리스트" description="이번 주 사용량을 기반으로 제안된 목록입니다.">
						<div className="space-y-3 text-sm">
							<div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
								<div>
									<p className="font-semibold text-slate-800">우유 (지방 2%)</p>
									<p className="text-xs text-slate-500">최근 3일 소비량 기준</p>
								</div>
								<Button variant="ghost">완료</Button>
							</div>
							<div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
								<div>
									<p className="font-semibold text-slate-800">닭가슴살 (200g)</p>
									<p className="text-xs text-slate-500">다음 주 밀프렙 대비</p>
								</div>
								<Button variant="ghost">완료</Button>
							</div>
							<div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
								<div>
									<p className="font-semibold text-slate-800">다진 마늘</p>
									<p className="text-xs text-slate-500">재고 30% 이하</p>
								</div>
								<Button variant="ghost">완료</Button>
							</div>
							<div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
								<div>
									<p className="font-semibold text-slate-800">세탁세제 리필</p>
									<p className="text-xs text-slate-500">생활용품 잔량 30% 이하</p>
								</div>
								<Button variant="ghost">완료</Button>
							</div>
							<Button variant="secondary" className="w-full">
								CSV 내보내기
							</Button>
						</div>
					</SectionCard>

					<SectionCard title="Webhook 연결 버튼" description="n8n Webhook URL만 연결하면 자동화가 시작됩니다.">
						<div className="space-y-2 text-sm">
							<Button variant="secondary" className="w-full">
								/webhook/expiry 호출
							</Button>
							<Button variant="secondary" className="w-full">
								/webhook/shopping-list 호출
							</Button>
							<Button variant="secondary" className="w-full">
								/webhook/weekly-report 호출
							</Button>
						</div>
						<div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
							버튼 onClick에 Axios/Fetch를 연결하고, n8n의 Webhook 노드 URL을 바인딩하세요.
						</div>
					</SectionCard>
				</div>
			</div>
		</div>
	)
}

const App = () => (
	<BrowserRouter>
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="inbound" element={<InboundPage />} />
				<Route path="consume" element={<ConsumePage />} />
				<Route path="manage" element={<ManagePage />} />
			</Route>
		</Routes>
	</BrowserRouter>
)

export default App

