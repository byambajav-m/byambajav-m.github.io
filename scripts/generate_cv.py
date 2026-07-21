#!/usr/bin/env python3
"""Generate the portfolio's downloadable CV PDF."""

from pathlib import Path
import shutil

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    FrameBreak,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public"
FILENAME = "byambajav-munkhbayar-cv.pdf"
PROFILE_PHOTO = PUBLIC_DIR / "profile.jpeg"

PAGE = colors.HexColor("#FBFAF7")
INK = colors.HexColor("#1D1D1B")
SECONDARY = colors.HexColor("#55524D")
MUTED = colors.HexColor("#7D7972")
SIDEBAR = colors.HexColor("#20211F")
SIDEBAR_TEXT = colors.HexColor("#EAE5DC")
SIDEBAR_MUTED = colors.HexColor("#AFA99F")
ACCENT = colors.HexColor("#C87852")
ACCENT_SOFT = colors.HexColor("#F0D9CB")
RULE = colors.HexColor("#DED9D0")

SIDEBAR_WIDTH = 63 * mm
LEFT_FRAME_X = 11 * mm
LEFT_FRAME_WIDTH = 42 * mm
RIGHT_FRAME_X = 73 * mm
RIGHT_FRAME_WIDTH = 120 * mm


def register_fonts():
    candidates = [
        (
            "/System/Library/Fonts/Supplemental/Arial.ttf",
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        ),
        (
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        ),
    ]
    for regular, bold in candidates:
        if Path(regular).exists() and Path(bold).exists():
            pdfmetrics.registerFont(TTFont("CVSans", regular))
            pdfmetrics.registerFont(TTFont("CVSans-Bold", bold))
            return "CVSans", "CVSans-Bold"
    return "Helvetica", "Helvetica-Bold"


FONT, FONT_BOLD = register_fonts()


class SectionHeading(Flowable):
    """Compact uppercase heading with a rule that fills the remaining width."""

    def __init__(self, title, text_color=ACCENT, rule_color=RULE, space_before=2.2 * mm):
        super().__init__()
        self.title = title.upper()
        self.text_color = text_color
        self.rule_color = rule_color
        self.spaceBefore = space_before
        self.spaceAfter = 1.7 * mm
        self.height = 6 * mm
        self.width = 0

    def wrap(self, avail_width, avail_height):
        self.width = avail_width
        return avail_width, self.height

    def draw(self):
        canvas = self.canv
        baseline = 2.1 * mm
        canvas.saveState()
        canvas.setFont(FONT_BOLD, 7.6)
        canvas.setFillColor(self.text_color)
        canvas.drawString(0, baseline, self.title)
        label_width = pdfmetrics.stringWidth(self.title, FONT_BOLD, 7.6)
        canvas.setStrokeColor(self.rule_color)
        canvas.setLineWidth(0.55)
        canvas.line(label_width + 3 * mm, baseline + 0.8 * mm, self.width, baseline + 0.8 * mm)
        canvas.restoreState()


class CVDocument(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=0,
            rightMargin=0,
            topMargin=0,
            bottomMargin=0,
            title="Byambajav Munkhbayar - CV",
            author="Byambajav Munkhbayar",
            subject="Software Engineer curriculum vitae",
        )
        frame_height = 269 * mm
        left_frame = Frame(
            LEFT_FRAME_X,
            14 * mm,
            LEFT_FRAME_WIDTH,
            frame_height,
            id="sidebar",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        right_frame = Frame(
            RIGHT_FRAME_X,
            14 * mm,
            RIGHT_FRAME_WIDTH,
            frame_height,
            id="main",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates(
            PageTemplate(id="cv", frames=[left_frame, right_frame], onPage=self.decorate)
        )

    @staticmethod
    def decorate(canvas, doc):
        width, height = A4
        canvas.saveState()
        canvas.setFillColor(PAGE)
        canvas.rect(0, 0, width, height, stroke=0, fill=1)
        canvas.setFillColor(SIDEBAR)
        canvas.rect(0, 0, SIDEBAR_WIDTH, height, stroke=0, fill=1)
        canvas.setFillColor(ACCENT)
        canvas.rect(SIDEBAR_WIDTH - 1.4 * mm, 0, 1.4 * mm, height, stroke=0, fill=1)

        if PROFILE_PHOTO.exists():
            image = ImageReader(str(PROFILE_PHOTO))
            image_width, image_height = image.getSize()
            diameter = 35 * mm
            radius = diameter / 2
            center_x = 31 * mm
            center_y = height - 31 * mm
            scale = max(diameter / image_width, diameter / image_height)
            draw_width = image_width * scale
            draw_height = image_height * scale

            canvas.saveState()
            clip = canvas.beginPath()
            clip.circle(center_x, center_y, radius)
            canvas.clipPath(clip, stroke=0, fill=0)
            canvas.drawImage(
                image,
                center_x - draw_width / 2,
                center_y - draw_height / 2,
                width=draw_width,
                height=draw_height,
                mask="auto",
            )
            canvas.restoreState()
            canvas.setStrokeColor(ACCENT_SOFT)
            canvas.setLineWidth(1.8)
            canvas.circle(center_x, center_y, radius, stroke=1, fill=0)

        canvas.setStrokeColor(RULE)
        canvas.setLineWidth(0.45)
        canvas.line(RIGHT_FRAME_X, 10 * mm, width - 17 * mm, 10 * mm)
        canvas.setFont(FONT, 6.8)
        canvas.setFillColor(MUTED)
        canvas.drawString(RIGHT_FRAME_X, 6.5 * mm, "BYAMBAJAV MUNKHBAYAR  /  SOFTWARE ENGINEER")
        canvas.drawRightString(width - 17 * mm, 6.5 * mm, f"PAGE {doc.page}")
        canvas.restoreState()


styles = getSampleStyleSheet()

styles.add(
    ParagraphStyle(
        name="Name",
        fontName=FONT_BOLD,
        fontSize=29,
        leading=31,
        textColor=INK,
        spaceAfter=1.5 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="Role",
        fontName=FONT,
        fontSize=11.5,
        leading=14,
        textColor=ACCENT,
        spaceAfter=4.5 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="Summary",
        fontName=FONT,
        fontSize=9.1,
        leading=13.2,
        textColor=SECONDARY,
        spaceAfter=2.5 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="JobRole",
        fontName=FONT_BOLD,
        fontSize=9.7,
        leading=11.6,
        textColor=INK,
    )
)
styles.add(
    ParagraphStyle(
        name="Company",
        fontName=FONT_BOLD,
        fontSize=8.2,
        leading=10,
        textColor=ACCENT,
    )
)
styles.add(
    ParagraphStyle(
        name="Period",
        fontName=FONT_BOLD,
        fontSize=7.3,
        leading=9,
        alignment=TA_RIGHT,
        textColor=MUTED,
    )
)
styles.add(
    ParagraphStyle(
        name="JobBody",
        fontName=FONT,
        fontSize=8.15,
        leading=11.35,
        textColor=SECONDARY,
        spaceBefore=1.2 * mm,
        spaceAfter=1.2 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="Tech",
        fontName=FONT,
        fontSize=7.1,
        leading=9.2,
        textColor=MUTED,
        spaceAfter=2.7 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="Project",
        fontName=FONT,
        fontSize=8.05,
        leading=11.1,
        textColor=SECONDARY,
        leftIndent=3 * mm,
        firstLineIndent=-3 * mm,
        spaceAfter=1.8 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="SideLabel",
        fontName=FONT_BOLD,
        fontSize=6.6,
        leading=8.2,
        textColor=ACCENT_SOFT,
        spaceAfter=0.6 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="SideText",
        fontName=FONT,
        fontSize=7.7,
        leading=10.4,
        textColor=SIDEBAR_TEXT,
        spaceAfter=2.2 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="SideSmall",
        fontName=FONT,
        fontSize=7.25,
        leading=9.8,
        textColor=SIDEBAR_MUTED,
        spaceAfter=2.6 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="SideEducation",
        fontName=FONT,
        fontSize=7.45,
        leading=10.2,
        textColor=SIDEBAR_TEXT,
        spaceAfter=3 * mm,
    )
)


def sidebar_heading(title):
    return SectionHeading(
        title,
        text_color=ACCENT_SOFT,
        rule_color=colors.HexColor("#555650"),
        space_before=2.5 * mm,
    )


def job(role, company, period, description, skills):
    heading = Table(
        [
            [
                [
                    Paragraph(role, styles["JobRole"]),
                    Paragraph(company.upper(), styles["Company"]),
                ],
                Paragraph(period.upper(), styles["Period"]),
            ]
        ],
        colWidths=[RIGHT_FRAME_WIDTH - 32 * mm, 32 * mm],
        hAlign="LEFT",
    )
    heading.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return KeepTogether(
        [
            heading,
            Paragraph(description, styles["JobBody"]),
            Paragraph(f"<font color='#C87852'>STACK</font> &nbsp; {skills}", styles["Tech"]),
        ]
    )


def build_cv():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    final_path = OUTPUT_DIR / FILENAME
    public_path = PUBLIC_DIR / FILENAME

    doc = CVDocument(str(final_path))
    story = [
        Spacer(1, 43 * mm),
        sidebar_heading("Contact"),
        Paragraph("LOCATION", styles["SideLabel"]),
        Paragraph("Ulaanbaatar, Mongolia", styles["SideText"]),
        Paragraph("EMAIL", styles["SideLabel"]),
        Paragraph(
            "<link href='mailto:byambajav.mun@gmail.com' color='#EAE5DC'>byambajav.mun@gmail.com</link>",
            styles["SideText"],
        ),
        Paragraph("GITHUB", styles["SideLabel"]),
        Paragraph(
            "<link href='https://github.com/byambajav-m' color='#EAE5DC'>github.com/byambajav-m</link>",
            styles["SideText"],
        ),
        sidebar_heading("Expertise"),
        Paragraph("ARCHITECTURE", styles["SideLabel"]),
        Paragraph("Clean Architecture<br/>Domain-Driven Design<br/>Microservices<br/>Event-Driven Systems", styles["SideSmall"]),
        Paragraph("BACKEND + DATA", styles["SideLabel"]),
        Paragraph("Python, FastAPI, Go, Java, Spring Boot, PostgreSQL, MongoDB, Weaviate", styles["SideSmall"]),
        Paragraph("FRONTEND + MOBILE", styles["SideLabel"]),
        Paragraph("React, Next.js, Angular, TypeScript, Flutter", styles["SideSmall"]),
        Paragraph("AI SYSTEMS", styles["SideLabel"]),
        Paragraph("RAG, LLM orchestration, vector search, TTS and STT integration", styles["SideSmall"]),
        sidebar_heading("Education"),
        Paragraph(
            "<b>Master's in Artificial Intelligence</b><br/>"
            "In Progress<br/>"
            "<font color='#AFA99F'>National University of Mongolia</font>",
            styles["SideEducation"],
        ),
        Paragraph(
            "<b>Bachelor's in Computer Science</b><br/>"
            "<font color='#AFA99F'>National University of Mongolia</font>",
            styles["SideEducation"],
        ),
        sidebar_heading("Language"),
        Paragraph("<b>Japanese</b><br/>JLPT N2", styles["SideEducation"]),
        FrameBreak,
        Paragraph("Byambajav<br/>Munkhbayar", styles["Name"]),
        Paragraph("Software Engineer", styles["Role"]),
        SectionHeading("Profile", space_before=0),
        Paragraph(
            "Software engineer building products end-to-end with domain-driven design and clean architecture. "
            "Experienced across backend, frontend, mobile, and platform engineering, with a recent focus on "
            "LLM platforms, RAG systems, Mongolian language technology, and AI agents.",
            styles["Summary"],
        ),
        SectionHeading("Experience"),
        job(
            "Senior Software Engineer",
            "Chimege Systems LLC",
            "2025 - Present",
            "Built BolorDuran for macOS and Microsoft 365, shipped the Chimege Reader text-to-speech product, "
            "and delivered the egune developer platform with its public OpenAI-compatible API. Currently "
            "designing an agent orchestration and RAG system.",
            "Python / FastAPI / Go / Swift / Weaviate / PostgreSQL / NLP / RAG",
        ),
        job(
            "Senior Software Engineer",
            "CoreMind LLC",
            "2024 - 2025",
            "Built emonos.mn, a pharmacy ecommerce platform used across Mongolia, plus its logistics backend, "
            "rider mobile app, and inventory system for pharmacy chains.",
            "Python / Django / Next.js / Flutter / PostgreSQL",
        ),
        job(
            "Fullstack Engineer / Development Manager",
            "Erin Systems LLC",
            "2020 - 2024",
            "Contributed to Gastromatic's customer-relations and digital-contract microservices. Led engineering "
            "for the Ministry of Justice and Internal Affairs accounting platform and contributed to the Jarvis LMS.",
            "Java / Spring Boot / Node.js / React / Angular / PostgreSQL / MongoDB",
        ),
        SectionHeading("Selected Work"),
        Paragraph(
            "<font color='#C87852'><b>01</b></font> &nbsp; <b>egune Platform</b> - Developer platform, billing, "
            "documentation, usage dashboards, and public API for Chimege's Mongolian LLM.",
            styles["Project"],
        ),
        Paragraph(
            "<font color='#C87852'><b>02</b></font> &nbsp; <b>e-accounting</b> - Multi-tenant accounting platform "
            "for Mongolia's Ministry of Justice and Internal Affairs; led engineering.",
            styles["Project"],
        ),
        Paragraph(
            "<font color='#C87852'><b>03</b></font> &nbsp; <b>emonos.mn</b> - Pharmacy ecommerce, logistics, rider, "
            "and inventory products serving the Mongolian market.",
            styles["Project"],
        ),
    ]

    doc.build(story)
    shutil.copy2(final_path, public_path)
    print(final_path)
    print(public_path)


if __name__ == "__main__":
    build_cv()
