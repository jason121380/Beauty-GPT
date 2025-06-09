
import React, { useState, useMemo } from 'react';
import { Search, Plus, Copy, Heart, BookOpen, Terminal, Code, Briefcase, Palette, Shield, Database, Brain, Zap, Globe, Users, MessageSquare, Megaphone, UserCheck, Award, GraduationCap, Calendar, TrendingUp, Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const categories = [
  { name: '顧客管理', count: 10, icon: Users },
  { name: '銷售話術', count: 3, icon: MessageSquare },
  { name: '社群經營', count: 3, icon: Megaphone },
  { name: '客戶互動', count: 4, icon: UserCheck },
  { name: '品牌經營', count: 3, icon: Award },
  { name: '教育培訓', count: 3, icon: GraduationCap },
  { name: '活動策劃', count: 2, icon: Calendar },
  { name: '流行趨勢', count: 3, icon: TrendingUp }
];

const prompts = [
  // 顧客管理
  {
    id: 2,
    title: "老客戶回流話術",
    description: "請提供一段吸引久未回店的老客戶回流的私訊話術，態度親切誠懇，附帶專屬回流優惠。",
    author: "@customer",
    date: "2024",
    category: "顧客管理"
  },
  {
    id: 3,
    title: "生日月客戶優惠訊息",
    description: "設計一則生日月份專屬優惠訊息，吸引客戶預約護髮或染燙服務，需溫馨且充滿誠意。",
    author: "@customer",
    date: "2024",
    category: "顧客管理"
  },
  {
    id: 4,
    title: "網路新客服務流程",
    description: "請針對美髮行業的網路新客設計一套從初次諮詢到首次預約服務完成的標準流程，包含具體話術和重點提醒，讓客戶感到專業與貼心。",
    author: "@customer",
    date: "2024",
    category: "顧客管理"
  },
  {
    id: 5,
    title: "VIP客戶專屬關懷計劃",
    description: "設計一套針對高消費VIP客戶的專屬關懷計劃，包含定期聯繫、專屬優惠、生日特典、提前預約新服務等特權內容，提高客戶忠誠度。",
    author: "@customer",
    date: "2024",
    category: "顧客管理"
  },
  {
    id: 6,
    title: "客戶分類管理策略",
    description: "提供一套美髮沙龍客戶分類管理策略，根據消費頻率、金額和忠誠度將客戶分為不同等級，並設計針對各類客戶的溝通頻率與行銷策略。",
    author: "@customer",
    date: "2024",
    category: "顧客管理"
  },
  {
    id: 7,
    title: "節慶祝賀訊息",
    description: "設計一系列適用於重要節慶（如新年、中秋、聖誕等）的客戶祝賀訊息，內容溫馨不做作，並巧妙結合美髮相關話題與優惠資訊。",
    author: "@customer",
    date: "2024",
    category: "顧客管理"
  },
  {
    id: 8,
    title: "客戶預約提醒系統",
    description: "設計一套客戶預約提醒系統的訊息模板，包含預約確認、提前提醒、當日提醒和感謝光臨後續，語氣專業友善且不打擾客戶。",
    author: "@customer",
    date: "2024",
    category: "顧客管理"
  },
  {
    id: 9,
    title: "客戶髮型紀錄卡設計",
    description: "設計一份數位化客戶髮型紀錄卡，詳細記錄客戶的髮質狀況、過往服務項目、使用產品、染燙配方，以及設計師專業建議，方便追蹤客戶髮型歷程。",
    author: "@customer",
    date: "2024",
    category: "顧客管理"
  },
  {
    id: 10,
    title: "推薦新客獎勵計畫",
    description: "設計一套「老客戶推薦新客人」的獎勵計畫，包含推薦機制、雙方優惠內容、執行流程和追蹤方式，有效擴大客戶群同時提升老客戶黏著度。",
    author: "@customer",
    date: "2024",
    category: "顧客管理"
  },
  {
    id: 11,
    title: "流失客戶挽回策略",
    description: "提供一套針對 6 個月以上未回店客戶的挽回策略，包含分析流失原因、設計階段性接觸訊息、專屬回流優惠方案，以及如何避免二次流失的長期維繫計畫。",
    author: "@customer",
    date: "2024",
    category: "顧客管理"
  },
  // 銷售話術
  {
    id: 12,
    title: "新客開發加購護髮話術",
    description: "設計一段針對初次來店客戶推薦加購護髮服務的話術，強調護髮的必要性及優惠，語氣須親切、專業且不具壓迫感。",
    author: "@sales",
    date: "2024",
    category: "銷售話術"
  },
  {
    id: 13,
    title: "產品銷售",
    description: "設計一則推薦自家護髮產品的銷售文案，著重於突出產品特色、解決客戶常見髮質問題，以及搭配現有優惠促進銷售。",
    author: "@sales",
    date: "2024",
    category: "銷售話術"
  },
  {
    id: 14,
    title: "季節限定服務推廣文案",
    description: "提供一段季節限定護髮或染燙服務的推廣文案，著重在季節特點與護理效益，增加客戶嘗鮮意願。",
    author: "@sales",
    date: "2024",
    category: "銷售話術"
  },
  // 社群經營
  {
    id: 15,
    title: "IG限動互動文案",
    description: "請設計一個 IG 限動互動問答遊戲，主題為『髮型小知識』，提高粉絲參與度並促進私訊詢問。",
    author: "@social",
    date: "2024",
    category: "社群經營"
  },
  {
    id: 16,
    title: "Facebook 互動貼文",
    description: "製作一篇 Facebook 貼文，主題為『最近流行的三款韓系髮型』，鼓勵粉絲投票選出最愛款式，並引導預約服務。",
    author: "@social",
    date: "2024",
    category: "社群經營"
  },
  {
    id: 17,
    title: "短影音腳本創作",
    description: "提供一個適合抖音或IG短影音的美髮技巧分享腳本，主題為『快速整理髮型技巧』，腳本需在30秒內完成，並吸引觀眾互動留言。",
    author: "@social",
    date: "2024",
    category: "社群經營"
  },
  // 客戶互動
  {
    id: 18,
    title: "私訊回覆",
    description: "客人私訊詢問染燙價格和推薦髮型，請提供一段具體且能引導預約的回覆範例，態度專業且親切。",
    author: "@interaction",
    date: "2024",
    category: "客戶互動"
  },
  {
    id: 19,
    title: "售後追蹤回訪話術",
    description: "提供一段美髮服務完成後一週的追蹤回訪話術，關心客戶使用護理後的效果，並給予進一步護髮建議。",
    author: "@interaction",
    date: "2024",
    category: "客戶互動"
  },
  {
    id: 20,
    title: "客戶滿意度調查文案",
    description: "撰寫一則簡短且溫馨的客戶滿意度調查訊息，主動詢問服務感受，增加顧客關係的親密感。",
    author: "@interaction",
    date: "2024",
    category: "客戶互動"
  },
  {
    id: 21,
    title: "客訴處理",
    description: "提供一段處理美髮店內服務客訴的回覆話術，態度必須誠懇、專業、提出具體解決方案，讓客戶感受到重視與負責。",
    author: "@interaction",
    date: "2024",
    category: "客戶互動"
  },
  // 品牌經營
  {
    id: 22,
    title: "美髮設計師個人品牌故事",
    description: "提供一篇美髮設計師個人品牌故事文案，強調設計師個人經歷與專業精神，提升個人品牌形象。",
    author: "@brand",
    date: "2024",
    category: "品牌經營"
  },
  {
    id: 23,
    title: "沙龍品牌形象介紹文案",
    description: "撰寫一則沙龍品牌形象介紹文案，傳達品牌專業、時尚且溫暖的形象，吸引目標客群。",
    author: "@brand",
    date: "2024",
    category: "品牌經營"
  },
  {
    id: 24,
    title: "招聘文案",
    description: "請撰寫一則吸引年輕且有熱情的美髮設計師加入團隊的招聘文案，強調工作環境、培訓制度與未來職涯發展機會。",
    author: "@brand",
    date: "2024",
    category: "品牌經營"
  },
  // 教育培訓
  {
    id: 25,
    title: "美髮專業知識教育文案",
    description: "撰寫一篇短篇貼文，教導客戶如何正確護髮、避免髮絲損傷，提升客戶對髮質健康的重視。",
    author: "@education",
    date: "2024",
    category: "教育培訓"
  },
  {
    id: 26,
    title: "美髮師內訓課程簡介文案",
    description: "設計一則內部美髮師培訓課程的簡介文案，強調實務技巧、創意啟發和團隊合作的價值。",
    author: "@education",
    date: "2024",
    category: "教育培訓"
  },
  {
    id: 27,
    title: "產品試用活動推廣文案",
    description: "設計一則髮品試用推廣文案，透過免費試用吸引客戶體驗後再加購，提升產品銷售。",
    author: "@education",
    date: "2024",
    category: "教育培訓"
  },
  // 活動策劃
  {
    id: 28,
    title: "店內年度感謝活動文案",
    description: "撰寫一篇店內年度感謝活動文案，感謝客戶一年支持，提供具體優惠或贈品吸引客戶到店參與。",
    author: "@events",
    date: "2024",
    category: "活動策劃"
  },
  {
    id: 29,
    title: "主題沙龍活動宣傳文案",
    description: "請規劃一個『夏日輕盈護髮派對』的活動文案，描述現場互動與優惠內容，吸引客戶報名參與。",
    author: "@events",
    date: "2024",
    category: "活動策劃"
  },
  // 流行趨勢
  {
    id: 30,
    title: "髮型趨勢分析與分享文",
    description: "提供一篇短文介紹今年最新流行的髮型風格，清晰地指出適合哪些臉型和個性，方便客戶參考。",
    author: "@trends",
    date: "2024",
    category: "流行趨勢"
  },
  {
    id: 31,
    title: "當季髮色流行推薦文案",
    description: "設計一則推薦當季流行髮色的貼文，強調搭配膚色與氣質，鼓勵客戶嘗試並預約染髮。",
    author: "@trends",
    date: "2024",
    category: "流行趨勢"
  },
  {
    id: 32,
    title: "IG 快問快答活動設計",
    description: "設計一個以「這個髮型適合你嗎？」為主題的限時快問快答，提升參與率與轉換私訊。",
    author: "@trends",
    date: "2024",
    category: "流行趨勢"
  }
];

// Advanced prompt data
const proPrompts = {
  "老客戶回流話術": "角色：你是一位資深美髮沙龍客戶管理專家\n任務：請幫我設計一段私訊話術\n內容：針對 3-6 個月未回店的老客戶，包含：\n- 問候語\n- 關心客戶近況\n- 提及上次服務內容\n- 介紹新服務或產品\n- 提供專屬回流優惠方案\n風格：誠懇、溫暖但不過度熱情，展現專業關懷\n格式：字數控制在 200 字內，分段清晰，最後附帶一句引導預約的話",
  
  "生日月客戶優惠訊息": "角色：你是一位美髮沙龍行銷專員\n任務：設計一則生日月份專屬優惠訊息\n內容：\n- 溫馨的生日祝福\n- 針對護髮或染燙服務的專屬優惠\n- 優惠使用期限與條件\n- 預約提醒\n風格：充滿誠意、溫暖友善、讓客人感受到重視\n格式：100-150 字，附帶一個吸引人的標題",
  
  "網路新客服務流程": "角色：你是美髮行業的客戶服務流程設計專家\n任務：設計一套網路新客從初次諮詢到服務完成的標準流程\n內容：包含以下階段的具體話術和操作指南：\n- 初次諮詢回覆\n- 預約確認流程\n- 首次到店迎接流程\n- 需求確認與建議\n- 服務過程中的互動要點\n- 服務完成後的回饋收集\n- 後續追蹤規劃\n風格：專業、貼心、顧客導向\n格式：分階段呈現，每個階段附帶 1-2 個實用話術範例",
  
  "VIP客戶專屬關懷計劃": "角色：你是高端美髮沙龍的VIP客戶關係管理專家\n任務：設計一套VIP客戶專屬關懷計劃\n內容：針對高消費、高頻率的VIP客戶，包含：\n- VIP客戶分級標準（消費金額、頻率等指標）\n- 每個等級專屬權益與優惠\n- 生日、節慶專屬禮遇設計\n- 專屬預約通道與彈性服務\n- 新服務/產品優先體驗機制\n- 專屬溝通頻率與內容規劃\n- 專屬設計師一對一關係維護策略\n風格：高端、重視、專業、細緻\n格式：300-350字，條理分明，具體可執行",
  
  "客戶分類管理策略": "角色：你是美髮沙龍客戶數據分析與管理專家\n任務：設計一套客戶分類管理策略\n內容：\n- 客戶分類標準（如消費金額、頻率、忠誠度等指標）\n- 建議的客戶分層（如鑽石、金卡、銀卡、潛力客等）\n- 各層級客戶的特點與價值分析\n- 各層級客戶的溝通頻率與方式建議\n- 各層級客戶專屬行銷策略與優惠設計\n- 客戶升級機制與激勵方案\n- 客戶數據收集與分析方法\n風格：數據導向、策略性、實用性高\n格式：分層級清晰呈現，包含實施建議與預期效果",
  
  "節慶祝賀訊息": "角色：你是美髮沙龍的節慶行銷專家\n任務：設計全年度主要節慶的客戶祝賀訊息\n內容：針對以下節慶設計訊息：\n- 農曆新年\n- 情人節\n- 婦女節/母親節\n- 父親節\n- 中秋節\n- 聖誕節/跨年\n每個節慶訊息需包含：\n- 應景的祝福語\n- 巧妙連結美髮或形象相關話題\n- 節慶專屬優惠或活動\n- 預約建議\n風格：溫馨、應景、不做作、品牌調性一致\n格式：每則訊息100-150字，附帶適合的標題",
  
  "客戶預約提醒系統": "角色：你是美髮沙龍的客戶體驗優化專家\n任務：設計客戶預約全流程的提醒訊息系統\n內容：針對以下時間點設計訊息模板：\n- 預約成功確認（含預約詳情、注意事項）\n- 預約前3天提醒\n- 預約前1天提醒\n- 預約當日早上提醒\n- 服務完成後的感謝訊息\n- 服務後7天的關懷追蹤\n- 服務後30天的再次預約建議\n每個模板需包含：\n- 適當的問候語\n- 必要資訊清晰呈現\n- 預約變更/取消指引（如適用）\n風格：專業、簡潔、友善、不打擾\n格式：每則訊息控制在100字內，重點突出",
  
  "客戶髮型紀錄卡設計": "角色：你是美髮沙龍的數位化管理顧問\n任務：設計一份數位化客戶髮型紀錄系統\n內容：設計一套完整的客戶髮型檔案，包含：\n- 基本客戶資料區塊（姓名、聯絡方式、生日等）\n- 髪質分析區塊（髮質類型、頭皮狀況、特殊狀況等）\n- 歷史服務紀錄區塊（日期、服務項目、金額等）\n- 技術配方紀錄區塊（染劑配方、燙髮藥水選用等）\n- 使用產品紀錄區塊（沙龍護理、居家護理推薦等）\n- 設計師專業建議區塊（造型建議、注意事項等）\n- 客戶偏好紀錄區塊（喜好風格、禁忌等）\n- 下次預約建議區塊（建議時間、項目等）\n風格：專業、系統化、易於填寫與查閱\n格式：區塊分明，設計成表格或數位化介面形式",
  
  "推薦新客獎勵計畫": "角色：你是美髮沙龍的客戶拓展策略專家\n任務：設計一套「老客戶推薦新客人」的獎勵計畫\n內容：\n- 計畫名稱與核心賣點\n- 推薦機制設計（如推薦碼、實體推薦卡等）\n- 推薦人獎勵內容（如折扣、積分、免費服務等）\n- 被推薦人優惠內容（首次體驗特惠等）\n- 多層次獎勵機制（如推薦越多獎勵越高）\n- 推薦追蹤與兌換流程\n- 計畫宣傳方式建議\n- 效果評估指標\n風格：激勵性、互惠互利、容易理解\n格式：300字左右，結構清晰，重點突出，附帶簡短宣傳語",
  
  "流失客戶挽回策略": "角色：你是美髮沙龍的客戶維繫與挽回專家\n任務：設計一套流失客戶挽回策略\n內容：針對6個月以上未回店的客戶，包含：\n- 流失客戶分類方法（如消費金額、頻率、流失時間等）\n- 流失原因分析與對應策略\n- 階段性接觸計劃（3個月、6個月、1年以上）\n- 每個階段的訊息內容與語氣建議\n- 專屬回流優惠方案設計（依流失時間與客戶價值）\n- 回流後的強化維繫計劃\n- 二次流失預防機制\n- 效果追蹤與調整方法\n風格：策略性、系統化、重視數據分析\n格式：350字左右，分階段清晰呈現，包含實際訊息範例",
  
  "新客開發加購護髮話術": "角色：你是專業美髮顧問與銷售技巧專家\n任務：設計針對初次來店客戶的護髮加購話術\n內容：\n- 髪質評估導入語\n- 客製化護髮需求分析\n- 解釋護髮對新染燙髮質的重要性\n- 介紹 2-3 種適合的護髮方案\n- 提及首次體驗的專屬優惠\n風格：親切、專業、教育性質為主，避免過度推銷感\n格式：對話形式，包含應對客人可能提出的疑慮，總長不超過 250 字",
  
  "產品銷售": "角色：你是美髮品牌產品專家\n任務：設計一則護髮產品的銷售文案\n內容：\n- 針對特定髮質問題（如乾燥、毛躁、受損等）\n- 產品的主要成分與功效說明\n- 使用方法和預期效果\n- 真實客戶使用心得（案例分享）\n- 現有促銷優惠\n風格：以解決問題為導向，專業但平易近人\n格式：200-250 字，可分段呈現，附帶一個吸引人的標題",
  
  "季節限定服務推廣文案": "角色：你是美髮沙龍的季節性服務規劃專家\n任務：撰寫一則季節限定護髮或染燙服務的推廣文案\n內容：\n- 連結季節特點與髮質需求（如夏季防曬、冬季保濕等）\n- 介紹限定服務的獨特之處\n- 服務效益與持續時間\n- 限定優惠與期限\n- 預約提醒\n風格：時尚、新鮮感、創造稀缺性\n格式：200 字內，包含吸引人的標題和清晰的行動呼籲",
  
  "IG限動互動文案": "角色：你是社群媒體互動內容創作專家\n任務：設計一個 IG 限動互動問答遊戲\n內容：主題為「髮型小知識」，包含：\n- 3-5 個趣味性髮型相關問答\n- 每個問題提供 2-3 個選項\n- 每個問答後附加專業解釋與小技巧\n- 引導粉絲私訊參與或分享心得\n風格：輕鬆活潑、互動性強、富教育意義\n格式：每個問題控制在 1-2 句話，整體設計成可輕鬆快速滑動的系列限動",
  
  "Facebook 互動貼文": "角色：你是美髮趨勢專家兼社群內容策劃師\n任務：製作一篇 Facebook 互動貼文\n內容：主題為「最近流行的三款韓系髮型」，包含：\n- 簡短介紹當下韓系髮型流行趨勢\n- 詳細描述 3 款不同風格的韓系髮型特點\n- 說明各髮型適合的臉型與個性\n- 設計投票互動機制\n- 提供預約建議與優惠資訊\n風格：專業中帶有親切感，具時尚敏銳度\n格式：300-400 字，分段清晰，配合實際張貼時可搭配圖片的提示",
  
  "短影音腳本創作": "角色：你是美髮內容創作者與短影音專家\n任務：撰寫一個適合抖音或IG的短影音腳本\n內容：主題為「快速整理髮型技巧」，包含：\n- 吸引觀眾注意的開場白（5秒內）\n- 2-3 個實用且簡單的髮型整理技巧\n- 每個技巧的操作步驟\n- 適用場合與效果說明\n- 互動呼籲（如：留言分享你最常用的髮型技巧）\n風格：活潑、節奏明快、實用為主\n格式：總時長控制在 30 秒內，分鏡頭呈現，包含畫面與旁白說明",
  
  "私訊回覆": "角色：你是專業美髮顧問\n任務：撰寫一段回覆客人私訊詢問的範例\n內容：針對客人詢問染燙價格和推薦髮型，包含：\n- 專業問候語\n- 價格區間說明（基本+依長度/材料增加的費用）\n- 提出 2-3 個需要進一步了解的問題（如髮質狀況、喜好風格等）\n- 2-3 款適合不同臉型的熱門髮型簡介\n- 預約建議與可約時段提示\n風格：專業、親切、有耐心、重視客製化建議\n格式：200-250 字，分段清晰，表達邏輯流暢",
  
  "售後追蹤回訪話術": "角色：你是美髮沙龍的客戶關係維護專員\n任務：撰寫一段服務後一週的追蹤回訪話術\n內容：\n- 溫馨的開場問候\n- 詢問髮型/護髮效果維持情況\n- 居家護理使用體驗\n- 提供 1-2 個實用的後續護理建議\n- 委婉提醒下次護理時間\n風格：貼心、專業、不過度打擾\n格式：150-200 字，簡潔有禮，容易透過訊息平台發送",
  
  "客戶滿意度調查文案": "角色：你是美髮沙龍的客戶體驗優化專家\n任務：撰寫一則客戶滿意度調查訊息\n內容：\n- 親切的感謝語\n- 2-3 個關於服務體驗的簡短問題\n- 設計師表現評價請求\n- 改進建議徵求\n- 表達重視客戶意見的態度\n風格：溫馨、誠懇、顯示重視\n格式：100-150 字，問題清晰易回答，避免過長使客人失去填寫意願",
  
  "客訴處理": "角色：你是美髮沙龍的危機處理專家\n任務：提供一段處理客訴的回覆話術\n內容：針對服務不滿意的客訴，包含：\n- 真誠的歉意表達\n- 認真傾聽客人不滿的表述\n- 明確的問題確認\n- 具體的解決方案（如：免費修改、折扣優惠、重做服務等）\n- 未來預防措施說明\n- 感謝客人提供改進機會\n風格：誠懇、專業、負責任、解決問題導向\n格式：250 字左右，語氣平和，清楚表達店家的處理誠意",
  
  "美髮設計師個人品牌故事": "角色：你是個人品牌故事文案撰寫專家\n任務：撰寫一篇美髮設計師的個人品牌故事\n內容：包含以下元素：\n- 設計師的職業起源與啟發\n- 專業訓練與重要里程碑\n- 獨特的美髮理念與風格\n- 克服的挑戰與成長歷程\n- 對客戶的承諾與價值觀\n- 未來願景\n風格：真實、有感染力、展現個人特色與熱情\n格式：300-400 字，敘事流暢，富有情感共鳴點",
  
  "沙龍品牌形象介紹文案": "角色：你是美髮沙龍品牌形象顧問\n任務：撰寫一則沙龍品牌形象介紹文案\n內容：\n- 沙龍的創立理念與故事\n- 品牌核心價值與美學理念\n- 獲取的服務特色與優勢\n- 設計師團隊特質\n- 典型客戶體驗描述\n- 品牌願景與承諾\n風格：專業、時尚、溫暖、有質感\n格式：250-300 字，結構完整，能吸引目標客群的注意",
  
  "招聘文案": "角色：你是美髮產業人才招募專家\n任務：撰寫一則招募美髮設計師的文案\n內容：\n- 吸引人的開場與沙龍簡介\n- 職位描述與主要職責\n- 理想候選人特質與技能要求\n- 工作環境與團隊文化介紹\n- 培訓制度與職涯發展路徑\n- 薪資福利與獎勵機制\n- 應徵方式與聯絡資訊\n風格：熱情、鼓舞人心、展現團隊文化與發展潛力\n格式：300-350 字，結構清晰，重點突出",
  
  "美髮專業知識教育文案": "角色：你是美髮護理教育專家\n任務：撰寫一篇教導客戶正確護髮的短篇貼文\n內容：\n- 常見髮質損傷的原因（如熱工具、染燙、環境因素等）\n- 3-4 個日常正確護髮的實用技巧\n- 不同髮質的護理重點差異\n- 專業產品使用建議\n- 錯誤護髮觀念糾正\n風格：教育性、實用、淺顯易懂\n格式：250-300 字，可用小標題或數字列點分隔不同要點",
  
  "美髮師內訓課程簡介文案": "角色：你是美髮教育培訓專家\n任務：設計一則內部美髮師培訓課程的簡介文案\n內容：\n- 課程目標與價值主張\n- 培訓內容綱要（技術、溝通、管理等面向）\n- 學習成果與能力提升預期\n- 實務演練與回饋機制\n- 謲師資歷與專長介紹\n- 團隊協作與知識分享元素\n風格：專業、鼓舞人心、重視實用技能與創意啟發\n格式：300 字左右，結構清晰，突出課程特色與價值",
  
  "產品試用活動推廣文案": "角色：你是美髮產品行銷專家\n任務：設計一則髮品試用推廣文案\n內容：\n- 產品特色與主要功效介紹\n- 試用活動參與方式說明\n- 試用體驗的獨特價值\n- 後續加購優惠詳情\n- 真實體驗見證分享\n- 活動期限與限量提示\n風格：熱情邀請、強調體驗價值、適度製造稀缺感\n格式：200-250 字，包含清晰的行動呼籲和參與步驟",
  
  "店內年度感謝活動文案": "角色：你是美髮沙龍活動策劃專家\n任務：撰寫一篇店內年度感謝活動文案\n內容：\n- 真摯的感謝詞與回顧年度亮點\n- 活動日期、時間與形式\n- 特別優惠詳情（如折扣、贈品、限定服務等）\n- VIP客戶專屬禮遇\n- 活動當天特色與亮點\n- 預約與參與方式\n風格：誠懇感謝、慶祝氛圍、重視客戶關係\n格式：250-300 字，重點突出，包含吸引人的標題與行動呼籲",
  
  "主題沙龍活動宣傳文案": "角色：你是美髮主題活動創意總監\n任務：規劃一個「夏日輕盈護髮派對」的活動文案\n內容：\n- 夏季髮質問題與護理需求介紹\n- 活動時間、地點與參與方式\n- 活動亮點與特色體驗（如髮質診斷、客製化護理等）\n- 專業髮型師現場示範與諮詢\n- 參與者專屬優惠與禮品\n- 報名方式與截止日期\n風格：充滿夏日活力、愉悅輕鬆、專業中帶有趣味性\n格式：300 字左右，條理分明，視覺描述生動",
  
  "髮型趨勢分析與分享文": "角色：你是時尚髮型趨勢分析師\n任務：撰寫一篇介紹最新流行髮型風格的短文\n內容：\n- 當下 2-3 種主流髮型趨勢介紹\n- 各髮型的特點與設計重點\n- 適合的臉型、髮質與個人風格分析\n- 日常維護與造型建議\n- 名人/網紅示範案例參考\n風格：專業、時尚敏銳、實用建議為導向\n格式：300-350 字，可分段或以小標題區分不同髮型，易於閱讀",
  
  "當季髮色流行推薦文案": "角色：你是時尚美髮色彩專家\n任務：設計一則推薦當季流行髮色的貼文\n內容：\n- 當季 3-4 種流行髮色介紹\n- 各髮色與不同膚色的搭配建議\n- 個人氣質與髮色選擇指南\n- 髮色維護與保養技巧\n- 預約染髮前的注意事項\n- 特別優惠與預約資訊\n風格：時尚專業、個人化建議、視覺描述豐富\n格式：250-300 字，結構清晰，易於理解不同色系特點",
  
  "IG 快問快答活動設計": "角色：你是美髮社群互動專家\n任務：設計一個「這個髮型適合你嗎？」的限時快問快答活動\n內容：\n- 引人注目的活動介紹與參與方式\n- 3-5 個關於臉型、髮質、生活習慣的診斷問題\n- 根據答案提供的髮型推薦邏輯\n- 互動回覆模板與引導私訊的話術\n- 參與者可獲得的專屬優惠\n風格：互動性強、個人化、專業中帶有趣味\n格式：問題簡短明確，回答選項清晰，整體流程順暢，適合限時動態呈現"
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [upgradedPrompts, setUpgradedPrompts] = useState<Set<number>>(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  // Calculate total count for "全部" category
  const totalPromptsCount = prompts.length;

  // Filter prompts based on search term and selected category
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = searchTerm === '' || 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '全部' || prompt.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const copyPrompt = (title: string) => {
    navigator.clipboard.writeText(title);
    toast({
      title: "已複製到剪貼簿",
      description: "提示詞已複製到您的剪貼簿。",
    });
  };

  const upgradePrompt = (promptId: number) => {
    const newUpgradedPrompts = new Set(upgradedPrompts);
    if (upgradedPrompts.has(promptId)) {
      newUpgradedPrompts.delete(promptId);
    } else {
      newUpgradedPrompts.add(promptId);
    }
    setUpgradedPrompts(newUpgradedPrompts);
    
    toast({
      title: upgradedPrompts.has(promptId) ? "已還原為基礎版" : "已升級為進階版",
      description: upgradedPrompts.has(promptId) ? "提示詞已還原為基礎版本。" : "提示詞已升級為進階版本。",
    });
  };

  const getPromptDescription = (prompt: any) => {
    if (upgradedPrompts.has(prompt.id)) {
      // Return the advanced prompt if available
      return proPrompts[prompt.title as keyof typeof proPrompts] || `【進階版】${prompt.description}`;
    }
    return prompt.description;
  };

  // Mobile sidebar content
  const SidebarContent = () => (
    <div className="p-6 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="搜尋提示詞..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">分類</h3>
        <nav className="space-y-1">
          <button
            onClick={() => {
              setSelectedCategory('全部');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors text-left ${
              selectedCategory === '全部'
                ? 'bg-teal-50 text-teal-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span className="flex-1">全部</span>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
              {totalPromptsCount}
            </span>
          </button>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                  selectedCategory === category.name
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1">{category.name}</span>
                {category.count && (
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button - only visible on mobile */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0 [&>button]:hidden">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            
            <img 
              src="/lovable-uploads/b78673fd-244c-4ba6-bb71-c22fbfadd339.png" 
              alt="LURE Prompts Logo" 
              className="h-10 w-auto"
            />
            <span className="text-sm text-gray-500 hidden md:inline">ChatGPT 美髮指令大全</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar - hidden on mobile */}
        <aside className="w-80 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto p-6 hidden md:block">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCategory}</h2>
          </div>

          {/* Prompts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrompts.map((prompt) => (
              <Card key={prompt.id} className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-teal-200 flex flex-col relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base font-semibold text-gray-900 leading-tight pr-8">
                      {prompt.title}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        upgradePrompt(prompt.id);
                      }}
                      className={`absolute top-3 right-3 h-8 w-8 transition-colors ${
                        upgradedPrompts.has(prompt.id) 
                          ? 'text-yellow-500 hover:text-yellow-600' 
                          : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col">
                  <CardDescription className={`text-sm text-gray-600 mb-4 flex-1 whitespace-pre-line overflow-hidden ${
                    upgradedPrompts.has(prompt.id) ? '' : 'line-clamp-4'
                  }`}>
                    {getPromptDescription(prompt)}
                  </CardDescription>
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs w-fit">
                        {prompt.category}
                      </Badge>
                      {upgradedPrompts.has(prompt.id) && (
                        <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                          進階版
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyPrompt(getPromptDescription(prompt))}
                      className="w-full bg-white border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700 rounded-lg"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      複製提示詞
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
