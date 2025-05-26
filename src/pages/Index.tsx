import React, { useState } from 'react';
import { Search, Plus, Copy, Heart, BookOpen, Terminal, Code, Briefcase, Palette, Shield, Database, Brain, Zap, Globe, Users, MessageSquare, Megaphone, UserCheck, Award, GraduationCap, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

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

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const { toast } = useToast();

  // Calculate total count for "全部" category
  const totalPromptsCount = prompts.length;

  const copyPrompt = (title: string) => {
    navigator.clipboard.writeText(title);
    toast({
      title: "Copied to clipboard",
      description: "Prompt has been copied to your clipboard.",
    });
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/427a0a8a-de0d-41e7-ac12-979e2bb1adc8.png" 
              alt="LURE Logo" 
              className="h-8 w-auto"
            />
            <span className="text-sm text-gray-500">ChatGPT 美髮指令大全</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="sm">Get Pro</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <div className="space-y-6">
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
                  onClick={() => setSelectedCategory('全部')}
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
                      onClick={() => setSelectedCategory(category.name)}
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCategory}</h2>
          </div>

          {/* Prompts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrompts.map((prompt) => (
              <Card
                key={prompt.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-teal-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base font-semibold text-gray-900 leading-tight">
                      {prompt.title}
                    </CardTitle>
                    <div className="flex space-x-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyPrompt(prompt.description);
                        }}
                        className="p-1 h-auto text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-gray-600 line-clamp-4 mb-4">
                    {prompt.description}
                  </CardDescription>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {prompt.category}
                    </Badge>
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
